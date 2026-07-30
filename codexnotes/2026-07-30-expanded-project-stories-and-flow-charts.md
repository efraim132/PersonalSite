# Expanded project stories and themed flow charts

## Goal

Turn the three newer project stories into substantial technical reads comparable
to the ComputerCraft EENet story. Explain the decisions and architecture, include
specific problems and solutions, add flow charts, and use the existing syntax
highlighting for code examples.

## What changed

- Added a reusable `StoryFlow` component with themed cards and directional
  connectors.
  - Desktop charts flow left to right.
  - Mobile charts stack vertically with downward arrows.
  - Charts use native HTML and CSS so the text remains selectable, accessible,
    and responsive.
- Added optional reading-time metadata to `BlogLayout`.
- Added SQL and JSON language support to the existing Highlight.js setup.
- Fixed the existing development-only Highlight.js security warning by resetting
  each code element to plain text before applying highlighting. This matters when
  React runs effects twice in development.
- Expanded the GrebKey story to cover:
  - license validation as a state machine;
  - cache invalidation after key and activation changes;
  - the one-use OAuth callback-code exchange;
  - Stripe-to-local billing reconciliation;
  - the public OpenAPI security boundary;
  - the final Worker, D1, KV, dashboard, and SDK architecture.
- Expanded the private transcription story to cover:
  - real-audio health checks instead of liveness-only checks;
  - immediate failure removal and two-probe recovery;
  - the combined trigger for temporary capacity;
  - durable lifecycle claims, leases, and reconciliation;
  - Redis request tracking and safe draining;
  - persisted operator switches and manual actions.
- Expanded the wedding image sharing story to cover:
  - guest, organizer, and share access boundaries;
  - the Worker, D1, private R2, and image-transformation architecture;
  - upload validation and upload-time WebP previews;
  - atomic storage reservations and compensating cleanup;
  - reversible organizer Trash behavior;
  - disabled share drafts, image membership checks, and token rotation;
  - mobile upload, curation, and gallery decisions.

## Length

Approximate source-text counts, including code and chart labels:

- ComputerCraft EENet reference story: 1,467 words
- GrebKey: 1,698 words
- Private transcription operations: 1,865 words
- Wedding image sharing service: 2,025 words

Each new page is labeled as a 15-minute technical read.

## Privacy boundary

- The private transcription story does not name the product, infrastructure
  provider, customer, alert destination, credentials, URLs, deployment
  identifiers, or exact capacity.
- The wedding story does not include the participants, date, locations, invite
  details, private links, uploaded media, credentials, account identifiers, or
  storage names.
- Code examples are reduced and renamed where necessary while preserving the
  actual engineering decision.

## Verification

- `npm run lint`
- `npm run build`
- `git diff --check`
- Desktop browser review at 1440 by 900 pixels
- Mobile browser review at 390 by 844 pixels
- Confirmed all three pages render three flow charts and four highlighted code
  blocks.
- Confirmed mobile pages have no horizontal document overflow; code blocks scroll
  internally when a line is wider than the viewport.
- Confirmed the Highlight.js warning no longer appears after navigating across all
  three stories in development.

## Git status

The changes are left uncommitted and unpushed for review. The unrelated
`.idea/inspectionProfiles/` directory remains untouched.
