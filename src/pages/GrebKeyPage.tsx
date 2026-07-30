import BlogLayout from '../components/BlogLayout/BlogLayout'
import CodeBlock from '../components/CodeBlock/CodeBlock'
import StoryFlow from '../components/StoryFlow/StoryFlow'

const validationCacheExample = `
const cacheKey = \`validate:\${licenseKey}\`
const cached = await env.CACHE.get(cacheKey)

if (cached != null) {
  return readCachedValidation(cached)
}

const validation = await loadValidationFromDatabase(licenseKey)
await env.CACHE.put(cacheKey, JSON.stringify(validation), {
  expirationTtl: 60,
})

return validation

// Any route that changes the key or its activations does this:
await env.CACHE.delete(cacheKey)
`

const callbackExchangeExample = `
// OAuth callback: put a short-lived, one-use code in the URL.
const callbackCode = crypto.randomUUID()
await env.CACHE.put(
  \`oauth_callback_code:\${callbackCode}\`,
  JSON.stringify({ sessionToken }),
  { expirationTtl: 60 },
)

return redirect(\`/auth/callback?code=\${callbackCode}\`)

// Frontend exchanges the code in a POST request.
const session = await api.exchangeCallbackCode(callbackCode)
storeSessionToken(session.token)
`

const billingReconciliationExample = `
const response = await stripe.subscriptions.list({
  customer: billingState.customerId,
  status: 'all',
})

if (!response.ok) {
  // Stripe is temporarily unavailable. Keep the last known state.
  return billingState
}

const subscription = response.data.find(grantsAccess)
if (subscription == null) {
  return persistPlan(accountId, 'free')
}

const plan = planForPrice(subscription.priceId)
return plan == null ? billingState : persistPlan(accountId, plan)
`

const openApiSecurityExample = `
app.get('/openapi.json', (context) => {
  return context.json(app.getOpenAPIDocument({
    openapi: '3.0.0',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'Session token or API key',
        },
      },
    },
  }))
})

// Runtime route stays available, but it is absent from public docs.
const billingRoute = createRoute({
  method: 'post',
  path: '/billing/checkout',
  hide: true,
})
`

export default function GrebKeyPage() {
  return (
    <BlogLayout
      title="How GrebKey grew beyond license checks"
      date="Spring–Summer 2026"
      readingTime="15 min read"
      tags={['Cloudflare', 'TypeScript', 'Python', 'Developer experience']}
      projectUrl="https://grebkey.efraim.us"
      intro="GrebKey started with one job: tell an application whether a license key is valid. The project became interesting when the API, cache, dashboard, billing system, documentation, and SDKs all had to give the same answer."
    >
      <h2>The first decision was to treat validation as a state machine</h2>
      <p>
        My first mental model was an endpoint that looked up a string and returned
        true or false. That model broke as soon as I added real license behavior. A
        key can be active, suspended, expired, or revoked. It belongs to one product,
        it may have a machine limit, and a particular machine may or may not already
        hold an activation. A plain boolean hides the reason an integration needs in
        order to respond correctly.
      </p>
      <p>
        I made the validation route the place where those facts meet. The Worker
        loads the license and its product owner, checks time-based expiry, compares
        an optional product identifier, looks for the supplied machine fingerprint,
        reconciles the owner’s billing state, records usage, and returns a stable
        reason when the answer is no. The dashboard changes the state; the public
        validation route interprets it.
      </p>
      <p>
        This choice kept the clients smaller. The Node and Python libraries do not
        need to recreate the rules for expiry or activation limits. They send the
        identifying information, receive a documented result, and decide how the
        host application should present it.
      </p>

      <StoryFlow
        title="A license validation request"
        description="The fast path avoids the database, but every result still passes through the same rule checks."
        steps={[
          {
            label: '01 · Client',
            title: 'Send key and fingerprint',
            detail: 'The SDK makes one request and keeps transport errors separate from invalid licenses.',
          },
          {
            label: '02 · Worker',
            title: 'Read cached key state',
            detail: 'A short-lived entry handles repeated checks without querying the database each time.',
          },
          {
            label: '03 · Rules',
            title: 'Check state and ownership',
            detail: 'Expiry, product matching, activation, billing, and usage are evaluated in one path.',
          },
          {
            label: '04 · Response',
            title: 'Return a useful reason',
            detail: 'The caller receives valid, expired, revoked, suspended, or product mismatch rather than a mystery failure.',
          },
        ]}
      />

      <h2>Caching introduced the first subtle failure</h2>
      <p>
        Repeated validations are the hottest path, so I cached the database result
        for a minute. That reduced database work, but it also created a correctness
        problem. If somebody revoked a key or removed a machine activation, the cache
        could continue returning the old state. Waiting a minute is short for a
        cache and surprisingly long for a person who just pressed “revoke.”
      </p>
      <p>
        I kept the cache because it solved a real load problem, but I made every
        mutation that changes validation delete the corresponding entry. The next
        check misses the cache and reconstructs the answer from the database. Expiry
        also deletes the cached value when it marks an active key expired. This is a
        small piece of code, but it expresses an important rule: cached validation is
        disposable; the database remains authoritative.
      </p>

      <CodeBlock
        codeString={validationCacheExample}
        language="TypeScript"
        title="Simplified validation cache and invalidation"
        showLineNumbers
      />

      <h2>The dashboard needed authentication without putting a session in the URL</h2>
      <p>
        The dashboard uses GitHub sign-in. The early callback completed the login and
        redirected the browser with the live session token in the query string. It
        worked, but URLs are copied into history, logs, screenshots, referrer data,
        and support messages. A seven-day credential did not belong there.
      </p>
      <p>
        I considered replacing the entire session model, but the rest of the
        dashboard already understood bearer sessions. A narrower fix was safer. The
        backend now creates a short-lived, one-use callback code and redirects with
        that code. The callback page immediately exchanges it through a POST request
        for the existing session shape. The code is deleted when it is read, so
        refreshing or replaying the URL cannot mint another session.
      </p>

      <StoryFlow
        title="The sign-in handoff"
        steps={[
          {
            label: '01 · Provider',
            title: 'Return authorization code',
            detail: 'The backend completes the provider exchange and creates the normal dashboard session.',
          },
          {
            label: '02 · Worker',
            title: 'Store one-use callback code',
            detail: 'The live session remains in server-side storage while a short-lived code goes into the redirect.',
          },
          {
            label: '03 · Browser',
            title: 'Exchange code with POST',
            detail: 'The callback page trades the code for the session instead of reading a credential from the URL.',
          },
          {
            label: '04 · Dashboard',
            title: 'Use existing bearer session',
            detail: 'The rest of the application keeps the same authentication contract.',
          },
        ]}
      />

      <CodeBlock
        codeString={callbackExchangeExample}
        language="TypeScript"
        title="One-use callback-code exchange"
        showLineNumbers
      />

      <h2>Billing required two sources of truth with different failure modes</h2>
      <p>
        Stripe knows whether a subscription actually grants access. The local
        database needs a plan value so every API request does not depend on a remote
        billing call. Webhooks normally keep those systems aligned, but a webhook can
        arrive late, be retried, or fail during a deployment. That left a dangerous
        case: the local row could remain paid after Stripe no longer had an
        entitling subscription.
      </p>
      <p>
        The important decision was how to behave when the two systems disagree. If
        Stripe responds successfully and no active, trialing, or otherwise
        entitling subscription exists, the local plan is downgraded to free
        immediately. If Stripe itself is unavailable, the code keeps the last known
        plan instead of turning a billing outage into an access outage. Successful
        reconciliation also maps the price back to a known plan and creates the
        matching usage period.
      </p>
      <p>
        That is intentionally asymmetric. A confirmed “no subscription” changes
        local state. An unknown answer caused by a network or provider error does
        not. I wrote mocked reconciliation tests for canceled and unpaid
        subscriptions, valid paid states, unknown prices, and failed Stripe
        responses because each branch represents a different business decision.
      </p>

      <CodeBlock
        codeString={billingReconciliationExample}
        language="TypeScript"
        title="The reconciliation decision, reduced to its core"
        showLineNumbers
      />

      <h2>The public API contract needed its own security boundary</h2>
      <p>
        I generated the OpenAPI document from the same route definitions used by the
        Worker so the public reference would not become a second handwritten API.
        That exposed two different problems. First, protected routes referenced
        bearer authentication but the generated document did not define what
        “bearerAuth” meant. Documentation tools knew a lock existed but could not
        render the Authorization header correctly. Second, a mechanically complete
        schema advertised sign-in completion and billing routes that did not belong
        in the public developer reference.
      </p>
      <p>
        The fix was not to stop generating documentation. I added the missing HTTP
        bearer scheme at the document root and marked the internal auth and billing
        registrations as hidden. Those routes still exist at runtime; they simply do
        not appear in the public contract. Licensing and API-key routes retain their
        machine-readable security requirements, including special confirmation
        headers for destructive actions.
      </p>

      <StoryFlow
        title="One route definition, two deliberate surfaces"
        steps={[
          {
            label: '01 · Route schema',
            title: 'Define input and output',
            detail: 'Validation rules and response shapes live beside the handler.',
          },
          {
            label: '02 · Runtime',
            title: 'Worker serves the route',
            detail: 'Middleware applies rate limits, authentication, and account boundaries.',
          },
          {
            label: '03 · Public schema',
            title: 'Generate only intended docs',
            detail: 'Developer routes are included; sign-in and billing internals are hidden.',
          },
          {
            label: '04 · Consumers',
            title: 'Docs and SDK examples agree',
            detail: 'The reference and language guides start from the same response contract.',
          },
        ]}
      />

      <CodeBlock
        codeString={openApiSecurityExample}
        language="TypeScript"
        title="Publishing authentication without publishing every route"
        showLineNumbers
      />

      <h2>The final architecture is a set of boundaries, not a pile of features</h2>
      <p>
        The React dashboard owns account work: products, keys, activations, API
        credentials, and billing actions. A Cloudflare Worker owns the API contract
        and separates public validation from protected management routes. D1 stores
        accounts, products, keys, activations, plans, and usage periods. KV handles
        short-lived validation entries, sessions, and one-use callback codes. Stripe
        remains authoritative for subscriptions, while reconciliation keeps the
        local plan useful for request-time limits.
      </p>
      <p>
        The SDKs sit outside that operational core. Their job is to make a remote
        check feel predictable in somebody else’s program: stable types, explicit
        error categories, and small methods that match the public docs. Keeping that
        boundary helped me avoid pushing dashboard or billing concepts into a client
        that only needs to validate and activate.
      </p>

      <h2>How the decision process changed</h2>
      <p>
        Early on I asked whether each endpoint returned the expected JSON. Later I
        started asking which system was authoritative, what could become stale, what
        appeared in a URL, what belonged in public documentation, and what happened
        if an external service returned no answer at all. Those questions produced
        smaller fixes than a rewrite, but they changed the shape of the system.
      </p>
      <p>
        My useful verification set now crosses the boundaries: mutate a key and
        confirm the next validation changes, exchange a callback code twice and make
        sure the second attempt fails, inspect the generated OpenAPI JSON directly,
        reconcile several Stripe states with mocked responses, and exercise the live
        dashboard-to-API path. The project grew beyond a license check because the
        surrounding decisions became part of whether that check could be trusted.
      </p>
    </BlogLayout>
  )
}
