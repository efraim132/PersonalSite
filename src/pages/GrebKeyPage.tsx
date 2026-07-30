import BlogLayout from '../components/BlogLayout/BlogLayout'

export default function GrebKeyPage() {
  return (
    <BlogLayout
      title="From license checks to a developer platform"
      date="Spring–Summer 2026"
      tags={['Cloudflare', 'TypeScript', 'Python', 'Developer experience']}
      projectUrl="https://grebkey.efraim.us"
      intro="GrebKey started with a narrow promise: make software licensing less painful for a small developer. Fulfilling that promise meant building much more than a validation endpoint."
    >
      <h2>The product is the whole path</h2>
      <p>
        A license service only works when every part of the path agrees. A developer
        has to create a product, issue a key, integrate a client, understand failures,
        manage activations, and know what happens when the network is unavailable.
        The API can be correct while that overall experience is still confusing.
      </p>
      <p>
        I worked across that entire path: the Cloudflare-based API, the React
        dashboard, GitHub sign-in, subscription state, generated API documentation,
        onboarding guides, and SDKs for Node and Python.
      </p>

      <h2>Designing one contract across four surfaces</h2>
      <p>
        The biggest challenge was not any single screen or route. It was keeping the
        same domain model coherent across the backend, dashboard, documentation, and
        client libraries. Activation counts, expiry, product matching, and billing
        state needed to mean the same thing everywhere.
      </p>
      <ul>
        <li>
          The API owns validation, activation, account boundaries, usage tracking,
          and billing reconciliation.
        </li>
        <li>
          The dashboard makes products, keys, account state, and next actions visible
          without exposing internal implementation details.
        </li>
        <li>
          Generated OpenAPI documentation stays tied to the code instead of drifting
          into a second, hand-maintained truth.
        </li>
        <li>
          Node and Python SDKs turn the remote contract into small, typed integration
          surfaces with predictable errors and offline-aware behavior.
        </li>
      </ul>

      <h2>Reliability lives in the client experience too</h2>
      <p>
        License checks happen inside somebody else’s product, often at the worst
        possible time to fail. The SDK work therefore focused on clear failure modes,
        conservative caching, and explicit recovery behavior. A temporary network
        problem should not look the same as a revoked or invalid license, and a
        client should never need to guess which state it received.
      </p>

      <h2>What I learned</h2>
      <p>
        Developer experience is not a polish layer. It is the product architecture
        made visible. When the examples, SDKs, dashboard, and API all tell the same
        story, developers can adopt the product with confidence. When they disagree,
        even a technically sound backend feels unreliable.
      </p>
      <blockquote>
        The best platform work removes decisions from the integration path without
        hiding the states a developer actually needs to understand.
      </blockquote>

      <h2>Where the project stands</h2>
      <p>
        GrebKey now has the shape of a complete developer platform: account and
        product management, license lifecycle tools, billing, public documentation,
        language-specific guides, and maintained client libraries. The remaining
        work is the familiar work of any real product—measuring the path, tightening
        the rough edges, and continuing to verify the live experience.
      </p>
    </BlogLayout>
  )
}
