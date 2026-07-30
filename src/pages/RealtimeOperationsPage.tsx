import BlogLayout from '../components/BlogLayout/BlogLayout'

export default function RealtimeOperationsPage() {
  return (
    <BlogLayout
      title="Making a real-time service operable"
      date="Summer 2026"
      tags={['Operations', 'Reliability', 'Product engineering']}
      intro="A live transcription product needed more than a healthy happy path. It needed a control surface for capacity, failure, recovery, and the humans responsible for keeping it available."
      disclosure="This case study is intentionally high level. It omits customer data, provider names, capacity figures, private URLs, alert destinations, credentials, and internal recovery details."
    >
      <h2>The hidden product behind the product</h2>
      <p>
        Real-time features create a second product that customers never see: the
        operational system. Requests arrive unevenly, workers become unhealthy,
        providers behave unpredictably, and a technically automatic system still
        needs a safe manual path when the unexpected happens.
      </p>
      <p>
        My work focused on that operational layer for a live transcription service.
        The goal was not simply to add more automation. It was to make the system’s
        decisions understandable and give an operator the right intervention at the
        right moment.
      </p>

      <h2>Features that changed the operating model</h2>
      <ul>
        <li>
          <strong>Health signals with memory:</strong> checks that distinguish a
          single missed response from a service that has stayed unhealthy.
        </li>
        <li>
          <strong>Automatic capacity management:</strong> demand-aware scaling with
          conservative defaults and an explicit scope for where automation is
          allowed to act.
        </li>
        <li>
          <strong>Recoverable provisioning:</strong> reconciliation that can resume
          after an interrupted or partially completed infrastructure operation.
        </li>
        <li>
          <strong>Persisted operator controls:</strong> a compact dashboard for
          enabling automation and notifications without editing deployment
          configuration during an incident.
        </li>
        <li>
          <strong>Manual failover tools:</strong> deliberate actions for recovery and
          cleanup when automation should stop and a person should take over.
        </li>
        <li>
          <strong>Actionable notifications:</strong> alerts tied to durable failure
          state, so the channel says what changed instead of repeating noise.
        </li>
      </ul>

      <h2>Automation needed a boundary</h2>
      <p>
        The most important design decision was that automatic behavior should be
        visible, scoped, and reversible. Defaults stayed safe. Paid or elastic
        infrastructure required an explicit opt-in. The dashboard showed whether
        automation was active, while manual recovery actions remained available.
      </p>
      <p>
        That boundary made the system easier to reason about in development and
        safer to operate in production. It also reduced the gap between what the
        code believed and what an operator thought was happening.
      </p>

      <h2>Recovery is a workflow, not an exception</h2>
      <p>
        Provisioning and failover touch external systems, so a process can stop
        between “requested” and “ready.” Treating that as a normal state led to a
        reconciliation model: observe current reality, compare it with the desired
        state, and continue from the safest next step.
      </p>

      <h2>What I learned</h2>
      <p>
        Reliability work is product work for operators. The best control is not the
        one with the most switches; it is the one that explains current state,
        preserves a safe default, and makes recovery boring. A healthy service is
        valuable. A service that can explain and recover from being unhealthy is
        operationally mature.
      </p>
    </BlogLayout>
  )
}
