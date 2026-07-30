import BlogLayout from '../components/BlogLayout/BlogLayout'

export default function GrebKeyPage() {
  return (
    <BlogLayout
      title="How GrebKey grew beyond license checks"
      date="Spring–Summer 2026"
      tags={['Cloudflare', 'TypeScript', 'Python', 'Developer experience']}
      projectUrl="https://grebkey.efraim.us"
      intro="GrebKey started with one job: tell an application whether a license key is valid. The interesting work began when caching, billing, documentation, and client libraries all had to agree with that answer."
    >
      <h2>A changed key could leave an old answer in the cache</h2>
      <p>
        Validation results are cached so repeated checks do not hit the database
        every time. That creates a concrete failure: if a key is suspended, revoked,
        or moved to a different machine, the cached result can keep saying the old
        thing until it expires.
      </p>
      <p>
        I kept the short-lived cache for the common validation path, but made the
        endpoints that change a key or its activations delete that key’s cached
        result. The next check goes back to the database and returns the new state
        immediately.
      </p>

      <h2>The local billing row could disagree with Stripe</h2>
      <p>
        A webhook can be delayed, retried, or missed. That meant the plan stored in
        the application could say “paid” after Stripe no longer had an active or
        trialing subscription, or could point at a price that no longer mapped to a
        known plan.
      </p>
      <p>
        I added a reconciliation step that asks Stripe for the customer’s current
        subscriptions, accepts only statuses that actually grant access, maps the
        returned price back to a plan, and updates the local row. If no subscription
        grants access, a stale paid account is moved back to the free plan.
      </p>

      <h2>The API docs said “bearer auth” without explaining it</h2>
      <p>
        The protected routes referenced a bearer authentication scheme, but the
        generated OpenAPI file did not include the scheme definition. Documentation
        tools could see that authentication was required without knowing that the
        token belonged in the Authorization header.
      </p>
      <p>
        I fixed the document generator to publish the missing security definition
        and kept account, billing, and sign-in routes out of the public reference.
        The same contract now feeds the documentation and the examples used by the
        Node and Python libraries, so an API change has fewer handwritten copies to
        drift.
      </p>

      <h2>What changed in how I test it</h2>
      <p>
        I stopped treating a successful build as proof that the product worked. The
        checks now cover the public validation response, cache invalidation after a
        key change, generated OpenAPI output, billing reconciliation, and the live
        dashboard-to-API handoff as separate paths.
      </p>
    </BlogLayout>
  )
}
