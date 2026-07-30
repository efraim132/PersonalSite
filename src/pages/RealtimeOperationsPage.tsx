import BlogLayout from '../components/BlogLayout/BlogLayout'
import CodeBlock from '../components/CodeBlock/CodeBlock'
import StoryFlow from '../components/StoryFlow/StoryFlow'

const realHealthCheckExample = `
async function checkServer(server: TranscriptionServer, sample: Buffer) {
  try {
    const response = await fetch(\`\${server.url}/transcribe\`, {
      method: 'POST',
      headers: authenticatedHealthHeaders(server),
      body: audioFormData(sample),
      signal: AbortSignal.timeout(requestTimeoutMs),
    })

    if (!response.ok) {
      return { status: 'failed', reason: \`HTTP \${response.status}\` }
    }

    const result = await response.json()
    if (typeof result.text !== 'string' || result.text.trim() === '') {
      return { status: 'failed', reason: 'No transcript returned' }
    }

    return { status: 'healthy' }
  } catch (error) {
    return { status: 'failed', reason: readableError(error) }
  }
}
`

const recoveryProbeExample = `
if (result.status === 'healthy' && await wasFailing(server.id)) {
  const successfulProbes = await incrementRecoveryCount(server.id)

  if (successfulProbes < 2) {
    return // One success is encouraging, but not enough to restore routing.
  }

  await clearFailureState(server.id)
  await clearRecoveryCount(server.id)
  await enableForNewRequests(server.id)
}

if (result.status === 'failed') {
  await disableForNewRequests(server.id)
  await clearRecoveryCount(server.id)
  await markFailure(server.id)
}
`

const durableClaimExample = `
return database.transaction(async (transaction) => {
  await lockCapacityLifecycle(transaction)

  const existing = await findLiveCapacity(transaction)
  if (existing != null) {
    return { instance: existing, shouldCreate: false }
  }

  const pending = await findPendingCapacity(transaction)
  if (pending != null && leaseIsOwnedByAnotherJob(pending)) {
    return { instance: pending, shouldCreate: false }
  }

  const claim = pending ?? await createPendingCapacity(transaction, {
    claimName: createUniqueClaimName(),
    ownerId: jobId,
    leaseExpiresAt: nextLeaseExpiry(),
  })

  return { instance: claim, shouldCreate: true }
})
`

const requestDrainExample = `
async function runAgainstServer(server: Server, request: WorkRequest) {
  await activeRequests.register({
    serverId: server.id,
    requestId: request.id,
    expiresInSeconds: 900,
  })

  try {
    return await server.transcribe(request.audio)
  } finally {
    await activeRequests.clear(server.id, request.id)
  }
}

async function drain(serverId: string) {
  await routing.remove(serverId)

  while (await activeRequests.count(serverId) > 0) {
    await waitForNextPoll()
  }

  await capacity.delete(serverId)
}
`

export default function RealtimeOperationsPage() {
  return (
    <BlogLayout
      title="Keeping live transcription running during server failures"
      date="Summer 2026"
      readingTime="15 min read"
      tags={['Operations', 'Reliability', 'Transcription']}
      intro="I worked on a live transcription service where a server could answer a status request but still fail on real audio. The recovery system had to detect that difference, add temporary capacity without duplicating it, and remove that capacity without interrupting work."
      disclosure="The product name, provider names, customer data, capacity figures, private URLs, credentials, alert destinations, and deployment identifiers are omitted. Code samples preserve the decisions but use simplified, generic names."
    >
      <h2>The first problem was deciding what “healthy” meant</h2>
      <p>
        The service routes queued and real-time audio to a small set of transcription
        servers. A normal infrastructure check could prove that a process answered
        HTTP, but not that it could decode audio, load the model, run inference, and
        return text. Those are exactly the failures a user experiences, so a green
        status endpoint was giving us confidence in the wrong layer.
      </p>
      <p>
        I changed the health check to use a tiny known audio sample and the real
        authenticated transcription route. A server only passes when the request
        succeeds and the response contains non-empty text. A timeout, non-success
        response, malformed body, or empty transcript all count as failures. This
        costs more than a lightweight ping, which is why the check runs on a measured
        schedule rather than continuously.
      </p>
      <p>
        The decision was based on the consequence of being wrong. A false failure may
        temporarily remove usable capacity. A false success sends customer work to a
        server that cannot complete it. For this path, testing the actual operation
        was worth the extra request.
      </p>

      <CodeBlock
        codeString={realHealthCheckExample}
        language="TypeScript"
        title="Health means completing a real transcription"
        showLineNumbers
      />

      <StoryFlow
        title="The normal transcription path"
        description="Health checks use the same final route, so they exercise more than process liveness."
        steps={[
          {
            label: '01 · Work arrives',
            title: 'Queue or live request',
            detail: 'Audio enters through an existing application path rather than a separate recovery service.',
          },
          {
            label: '02 · Router',
            title: 'Choose an enabled server',
            detail: 'The registry contains configured servers plus temporary runtime capacity.',
          },
          {
            label: '03 · Tracker',
            title: 'Mark request active',
            detail: 'A short-lived Redis record connects the request to the selected server.',
          },
          {
            label: '04 · Transcriber',
            title: 'Return text and clear marker',
            detail: 'Cleanup runs even when the request throws; the expiry handles a crashed worker.',
          },
        ]}
      />

      <h2>Failure and recovery needed different thresholds</h2>
      <p>
        When a real-audio check fails, the server is immediately removed from new
        routing and a durable-enough failure marker is written to Redis. Existing
        requests are allowed to finish. Alerts are tied to the transition into a
        failing state rather than every scheduled check, which prevents a broken
        server from filling the channel with identical messages.
      </p>
      <p>
        Recovery is more conservative. One successful sample after a failure may be a
        brief warm moment between two bad checks. I require two consecutive
        successful probes at the existing one-minute cadence before putting the
        server back into routing. A failure resets that count. This adds roughly one
        to two minutes of recovery delay, but avoids bouncing real traffic onto an
        unstable machine.
      </p>
      <p>
        I originally considered checking more frequently to make the return faster.
        That would add model work to machines that may already be under stress. The
        two-check rule on the normal schedule was the better trade: slightly slower
        restoration in exchange for lower probe load and less flapping.
      </p>

      <CodeBlock
        codeString={recoveryProbeExample}
        language="TypeScript"
        title="Immediate removal, cautious restoration"
        showLineNumbers
      />

      <h2>Detection alone did not answer when to buy temporary capacity</h2>
      <p>
        One failed server is useful information, but it does not always mean the
        entire service needs another machine. The status sampler already classified
        the overall service as healthy, degraded, or unavailable. I combined those
        two signals: temporary capacity is considered only when the service is
        degraded or unavailable and at least one registered server still has a
        current failure marker.
      </p>
      <p>
        That prevents a stale status sample from creating capacity after the failing
        server has recovered. It also prevents one noisy health record from scaling a
        system whose overall request path remains healthy. An incident latch keeps
        repeated samples from queuing the same action while one is already underway.
      </p>

      <StoryFlow
        title="From failure to temporary capacity"
        steps={[
          {
            label: '01 · Probe',
            title: 'Real audio fails',
            detail: 'The server leaves routing and receives a failure marker.',
          },
          {
            label: '02 · Sampler',
            title: 'Confirm service impact',
            detail: 'Scaling requires degraded or unavailable service plus a server still marked failing.',
          },
          {
            label: '03 · Lifecycle',
            title: 'Claim one operation',
            detail: 'A database lock, durable row, unique claim, and lease prevent duplicate creation.',
          },
          {
            label: '04 · Registration',
            title: 'Prove and add capacity',
            detail: 'The new server passes readiness and real-audio checks before entering routing.',
          },
        ]}
      />

      <h2>Provisioning had to survive a crash between two systems</h2>
      <p>
        Creating temporary capacity is an external side effect. The queue worker can
        stop after the provider creates a server but before the application saves its
        identifier. A simple retry then sees no local server and creates another
        billable one. Two scheduled jobs can produce the same race even without a
        crash.
      </p>
      <p>
        Redis was not enough for this lifecycle because the state needed to survive
        restarts and explain what happened later. I added a database record with
        provisioning, active, draining, and deleted phases. A database-level lock
        serializes claims. Before calling the provider, the job stores a unique claim
        name, its operation identifier, and a lease expiry.
      </p>
      <p>
        If another job sees a live lease owned by somebody else, it does nothing. If
        a lease expires, reconciliation can take ownership and search the provider
        using the durable identifier or unique claim. It resumes activation or
        cleanup instead of blindly creating a replacement. Ambiguous old records are
        flagged for manual reconciliation because guessing is more expensive than
        stopping.
      </p>

      <CodeBlock
        codeString={durableClaimExample}
        language="TypeScript"
        title="Simplified durable provisioning claim"
        showLineNumbers
      />

      <h2>The new server is not useful until it passes the real path too</h2>
      <p>
        A successful provider response only proves that a resource was requested.
        The provisioning workflow waits for network readiness, performs a basic
        health request, then sends the same authenticated sample transcription used
        by the regular health loop. Only after all of those steps succeed does it
        place the server in the runtime registry.
      </p>
      <p>
        The registry combines configured primary servers with database-backed runtime
        overrides. The existing router continues to choose among enabled servers; it
        does not know how a temporary server was purchased. Keeping provisioning out
        of the request router meant the normal transcription code changed only where
        it reads available capacity and tracks the request it selected.
      </p>

      <h2>Safe deletion required request-level accounting</h2>
      <p>
        Recovery creates the opposite race. When the primary machines pass two
        checks, the temporary one is no longer needed. Deleting it immediately can
        cut off audio already assigned to it. Looking only at queue depth cannot
        answer the question because work may have left the queue and still be running
        on a specific server.
      </p>
      <p>
        I added a Redis marker around every outbound transcription attempt. It
        includes the request and server identifiers and expires after a period longer
        than the request timeout. Registration and cleanup are best-effort so a Redis
        problem does not turn a working transcription into a failure. The expiry is a
        backstop for a worker that disappears before its finally block runs.
      </p>
      <p>
        Cleanup first removes the temporary server from routing, which stops new work
        from choosing it. It then polls the number of active markers for that server.
        At zero, deletion is safe. After a configured cutoff, an operator or the
        cleanup job can force deletion and report how many requests were still
        active. That makes the tradeoff visible instead of pretending forced cleanup
        is harmless.
      </p>

      <CodeBlock
        codeString={requestDrainExample}
        language="TypeScript"
        title="Track, remove from routing, drain, then delete"
        showLineNumbers
      />

      <StoryFlow
        title="Recovery and cleanup"
        steps={[
          {
            label: '01 · Primary',
            title: 'Pass two real probes',
            detail: 'The recovered server returns to routing only after consecutive successes.',
          },
          {
            label: '02 · Temporary',
            title: 'Stop receiving new work',
            detail: 'The runtime registry removes temporary capacity before deletion begins.',
          },
          {
            label: '03 · Drain',
            title: 'Wait for active count',
            detail: 'Redis request markers show whether work is still running on that exact server.',
          },
          {
            label: '04 · Delete',
            title: 'Clean up or report cutoff',
            detail: 'Normal cleanup waits for zero; forced cleanup records the interrupted count.',
          },
        ]}
      />

      <h2>Operators needed controls that did not require a deployment</h2>
      <p>
        The first controls lived in environment variables. That was acceptable for
        safe defaults but awkward during an incident: changing a deployment to stop
        automatic purchasing or silence alerts adds unrelated risk. I moved the
        operational switches into persisted application settings shown in the
        existing dashboard failover card.
      </p>
      <p>
        Automatic scaling is checked once when the sampler schedules work and again
        when the queued job executes. The second check matters because an operator
        may turn automation off while a job is waiting. Alert delivery checks its own
        setting and remains best-effort; a notification failure must not clear the
        underlying failure state. Manual test, safe drain, and force-delete actions
        remain available behind the stricter operator permission.
      </p>

      <h2>What I would carry into another system</h2>
      <p>
        The architecture ended up using different stores for different kinds of
        truth. The database owns lifecycle history and operation leases. Redis owns
        short-lived failure, incident, and active-request signals. The runtime
        registry owns current routing. The queue owns retries and scheduled work.
        Trying to collapse those into one “autoscale state” would make crash recovery
        harder to explain.
      </p>
      <p>
        The most important decisions were not about adding more automation. They were
        about defining evidence: a real transcript proves health, two successes prove
        recovery, a durable claim proves who may provision, an active-request marker
        proves whether deletion is safe, and a persisted switch proves what an
        operator intended. Once those facts were explicit, the automatic steps became
        much less mysterious.
      </p>
    </BlogLayout>
  )
}
