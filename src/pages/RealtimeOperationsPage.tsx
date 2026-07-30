import BlogLayout from '../components/BlogLayout/BlogLayout'

export default function RealtimeOperationsPage() {
  return (
    <BlogLayout
      title="Keeping live transcription running during server failures"
      date="Summer 2026"
      tags={['Operations', 'Reliability', 'Tooling']}
      intro="I worked on a live transcription service where a server could answer a status request but still fail on real audio. The fixes had to detect that failure, add temporary capacity without duplicating it, and remove that capacity without cutting off work in progress."
      disclosure="This case study is intentionally high level. It omits customer data, provider names, capacity figures, private URLs, alert destinations, credentials, and internal recovery details."
    >
      <h2>A green status endpoint did not prove transcription worked</h2>
      <p>
        The original question was whether a server responded. That was not enough:
        the process could be alive while the model, audio decoder, or transcription
        route was broken.
      </p>
      <p>
        I changed the scheduled check to submit a small known audio file to the same
        transcription route used by real work. A response only counts as healthy
        when it succeeds and contains text. A failed server is removed from routing,
        and it must pass twice in a row before it is allowed back in.
      </p>

      <h2>Two jobs could try to create the same fallback server</h2>
      <p>
        Provisioning happens outside the application and can take long enough for
        another scheduled job to start. A restart can also happen after the external
        server was created but before its identifier was saved. Simply retrying could
        create a second paid server.
      </p>
      <p>
        I added a database row for each server lifecycle, a lock around claims, and a
        lease showing which job owns provisioning. Every attempt gets a durable claim
        name before it calls the provider. After a crash, reconciliation searches for
        that same claim and resumes cleanup or activation instead of starting over.
      </p>

      <h2>Deleting recovered capacity could interrupt a live request</h2>
      <p>
        Once the main servers recovered, the temporary server had to go away. Removing
        it immediately could stop a transcription that had already been assigned to
        it. I first remove the server from new routing, then count its active requests
        in Redis and wait for them to reach zero before deleting it. Each request
        marker has an expiry so a crashed worker cannot block cleanup forever.
      </p>

      <h2>The controls had to work during an incident</h2>
      <p>
        Turning automatic capacity and alerts on or off originally meant changing
        deployment configuration. I moved those switches into persisted dashboard
        controls and checked them both when scheduling a job and again when the job
        runs. Manual test, drain, and force-delete actions remain available when a
        person needs to take over.
      </p>
    </BlogLayout>
  )
}
