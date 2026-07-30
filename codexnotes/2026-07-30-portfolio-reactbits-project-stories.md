# Portfolio refresh: React Bits and project stories

## What changed

- Rebuilt the home page around an operations-minded systems portfolio.
- Added React Bits-inspired `SpotlightCard` and `Magnet` interactions. The source
  attribution and license text are in `THIRD_PARTY_NOTICES.md`.
- Expanded the project archive with current work across:
  - the public GrebKey developer platform and SDKs;
  - a private real-time operations case study;
  - a private event-media case study;
  - the Nudge hardware control surface;
  - ATCVoice;
  - the Deej desktop audio and display console;
  - the existing EENet, SuperLua, and earlier web projects.
- Added three long-form project retrospectives:
  - `/writing/grebkey`
  - `/writing/realtime-operations`
  - `/writing/private-event-media`
- Added a custom 1200x630 social-preview image at `public/og.png`.
- Updated metadata, navigation, contact, about, footer, responsive layouts, focus
  states, and reduced-motion behavior.
- Limited Highlight.js to the languages the site uses, reducing the main
  production JavaScript bundle from roughly 1.2 MB to roughly 321 KB.

## Privacy decisions

- The private event project does not name the person, event, date, location,
  private URL, invite details, media, access setup, or storage identifiers.
- The real-time product case study does not name the product or expose customer
  data, providers, capacity figures, private URLs, alert destinations,
  credentials, or recovery internals.
- Private stories use broad project windows (`Summer 2026`) instead of event
  dates or invented publication dates.
- Both private stories include a visible privacy-boundary note explaining that
  implementation details were intentionally omitted.
- The social image contains only the public portfolio name and title.

## Verification completed

- `npm run lint`
- `npm run build`
- `git diff --check`
- A targeted content scan for private names, product names, providers,
  credentials, API keys, tokens, customer details, and event terminology.
- Social-card dimensions confirmed at 1200x630.

## Follow-up note

`npm audit` reports advisories in the current toolchain and router dependency.
The affected router features are not used for server rendering or user-supplied
navigation in this static portfolio, but the dependency should be upgraded in a
separate focused maintenance pass after checking the next major router release.
