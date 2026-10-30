# macOS design rework

Status: research and implementation plan; no UI implementation yet.
Branch: `feat/macos-design-rework`, created from `ReactRework`.
Research date: October 31, 2026.

## Direction

Create an Apple-inspired portfolio for Efraim's software, hardware, and engineering stories: spacious, tactile, and personal. The memorable element is a floating glass navigation surface above a quiet canvas, supported by pill-shaped actions and fluid, responsive transitions. The content should still feel like Efraim's work, with his portrait, Navy background, actual projects, and technical writing.

This is a web interpretation of Apple's design language. Apple's native Liquid Glass APIs, adaptive optics, and accessibility behaviors do not automatically apply to React or CSS.

## Research and decisions

Reviewed both WWDC session transcripts and the relevant official documentation listed below. This covers the material, controls, motion, layout, typography, color, accessibility, and macOS guidance needed for this redesign; it is not a claim to have reviewed Apple's entire developer documentation library. Current HIG pages can include updates after WWDC25.

| Apple guidance | Application to this site |
| --- | --- |
| [Get to know the new design system, WWDC25 session 356](https://developer.apple.com/videos/play/wwdc2025/356/) | Use concentric corners, grouped navigation, and consistent relationships across screen sizes. Large actions use capsules; compact controls use rounded rectangles. |
| [Meet Liquid Glass, WWDC25 session 219](https://developer.apple.com/videos/play/wwdc2025/219/) | Give navigation a distinct floating layer. Avoid stacked glass. Reserve tint for the action that needs emphasis. |
| [Materials](https://developer.apple.com/design/human-interface-guidelines/materials) | Use a legible, regular-style glass approximation for navigation and its menu. Keep article text and project content on stable surfaces. |
| [Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass) | Audit existing custom backgrounds and controls together. Implement web fallbacks explicitly instead of assuming native framework behavior. |
| [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons) | Give every custom control a pressed state and clear action label. Distinguish primary actions through treatment, not oversized dimensions. |
| [Motion](https://developer.apple.com/design/human-interface-guidelines/motion) | Keep feedback brief, interruptible, and tied to an action. A menu expands from its trigger and returns toward it when dismissed. |
| [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars) | Group related destinations; separate Resume from section navigation. Reduce crowding on narrow screens. |
| [Typography](https://developer.apple.com/design/human-interface-guidelines/typography) | Use a readable system font and a clear hierarchy with regular through bold weights. Preserve structure when text grows. |
| [Color](https://developer.apple.com/design/human-interface-guidelines/color) | Define semantic light/dark tokens; reserve blue for meaningful actions and selection. Test colors against translucent backgrounds. |
| [Layout](https://developer.apple.com/design/human-interface-guidelines/layout) | Adapt to available width, preserve content order and related groups, and separate navigation from content. |
| [Icons](https://developer.apple.com/design/human-interface-guidelines/icons) | Use consistent, simple SVG icons with accessible labels. Keep text when an icon's meaning would be ambiguous. |
| [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) | Support keyboard use, enlarged text, adequate contrast, and motion preferences. Give moving media a pause control. |
| [Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos) | Make good use of wide windows and pointer input while retaining keyboard and touch access. |

## Visual system

These are proposed web design tokens and tuning values, not Apple specifications.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| Canvas | `#F1F6FC` | `#101E31` | Page background |
| Surface | `#FFFFFF` | `#1C304A` | Content panels |
| Text | `#142B49` | `#EFF6FF` | Primary text |
| Secondary | `#465D77` | `#BCCFE5` | Supporting text |
| Accent | `#075BC7` | `#9AC8FF` | Links and prominent actions |
| Separator | `#CCD9E9` | `#38516F` | Meaningful boundaries |

- Default to the system's light/dark preference. Offer System, Light, and Dark in a small appearance control; persist only an explicit choice.
- Use `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` for interface and prose. Let Apple devices supply their system font; do not bundle downloaded SF fonts. Keep monospace for code only.
- Starting type scale: 48–80px hero, 32–48px section headings, 22–28px panel titles, 17–19px body, and 14–15px metadata. Use rem/clamp values so text can enlarge.
- Left-align copy and headings. Limit prose to roughly 65–72 characters per line. Use comfortable 1.5–1.65 body line height.
- Use a 1200px maximum content width, generous section spacing, and 20–32px page gutters that adapt to width.
- Capsule actions: approximately 48px high with generous horizontal padding and radius of half their height. Keep a minimum 44px interaction target as a project choice for touch use.
- Large content panels: roughly 28–32px corners. Nested artwork radius equals the outside radius minus its inset where practical. Smaller controls: 10–14px corners.
- Glass: restrained backdrop blur, a translucent fill with enough opacity for legibility, a subtle edge highlight, and a soft elevation shadow. Never blur the text itself. Use a solid fallback if blur is unavailable or transparency is reduced.

## Layout options and selected approach

Option A — floating navigation over an open portfolio canvas (selected): gives the work room, keeps the familiar page structure, and makes the glass and buttons the distinguishing interaction.

```text
Desktop
  ( Efraim Grebnev    Projects  Stories  About  Contact )  (Resume)

  Efraim Grebnev                     Quiet Navy media/portrait
  Software, hardware, and            with an explicit play control
  notes from building things.
  (Browse projects) (Read stories)

  Selected work
  [ One substantial featured project                         ]
  [ Supporting project          ] [ Supporting project       ]
  Remaining featured work + compact project archive

  Stories — readable editorial rows
  About — portrait and engineering background
  Contact — Email action and supporting links
```

Option B — persistent macOS-style sidebar plus content: appropriate for a dense workspace, but consumes space without helping this portfolio's short navigation. Do not use it for the homepage.

```text
Mobile
  ( Efraim Grebnev                        Menu )
  Heading and introduction
  (Browse projects) (Read stories)
  Quiet media
  Selected work, one column
  Stories / About / Contact
```

Review against the brief: preserve the requested bubbly controls and fluid feel, but replace a potential grid of identical glass cards with varied content layouts. Avoid a simulated desktop, decorative window controls, and a dock with invented actions. Those would add interaction unrelated to browsing the portfolio.

## Page-by-page scope

1. **Navigation:** turn the full-width fixed bar into an inset floating surface. Keep Projects, Stories, About, Contact, and Resume. Use a subtle active-section indicator. On mobile, the Menu control expands into an anchored panel in the same glass surface; implement it as a navigation disclosure, not an application menu. Include expanded state, Escape dismissal, and focus return. Hidden links must not remain keyboard-focusable.
2. **Hero:** foreground Efraim's name and the existing software/hardware/writing identity. Remove the numbered capability strip and magnetic cursor displacement. Keep the Navy media as a quieter visual with a poster while loading, muted autoplay, and an explicit pause/resume control; avoid a continuous full-screen motion backdrop. Derive a poster from the existing video during implementation.
3. **Projects:** retain all five featured entries and the archive. Give one featured story a larger presentation, with the others arranged in a balanced grid. Use existing project data and real imagery where available; otherwise use typography and restrained diagrams rather than fabricated screenshots. Keep links and privacy disclosures explicit.
4. **Stories:** use readable rows with title, summary, and date, with subtle interaction feedback. Preserve every current route.
5. **About and Contact:** retain the portrait and Navy narrative, simplify decorative labels, and use capsule actions for email and resume. Secondary social destinations remain straightforward links.
6. **Article pages:** use the shared BlogLayout for a calm reading view. Keep code blocks, titles, dates, project links, and privacy notices. Provide the same navigation and appearance across every article and the not-found page.

## Motion specification

Starting values below require visual tuning; they are not prescribed Apple timings.

| Interaction | Proposed response | Reduced motion |
| --- | --- | --- |
| Button hover/focus | Slight highlight and elevation change, 120–160ms; pointer hover only where supported | Color/outline feedback |
| Button press/release | Compress to approximately 0.97 scale, recover over 220–300ms with very small overshoot | Immediate pressed fill |
| Mobile menu | Expand from the trigger, short translate/scale plus opacity over 240–320ms; reverse on dismissal | Instant open/close or brief opacity change |
| Active navigation | Move selection highlight over 200–260ms without moving labels | Instant selection change |
| Initial hero | One restrained entrance sequence, 350–450ms | Immediately visible |
| Article navigation | Optional brief fade after navigation; content and focus update immediately | No transition |

Use native scrolling. Do not delay navigation until an animation finishes. Cancel or retarget animations during rapid interaction. Avoid continuous ambient animation, cursor chasing, parallax, and per-card scroll reveal choreography. Remove obsolete Magnet/ScrollReveal usage and delete helpers only after all callers are migrated.

## Implementation sequence

1. **Baseline and tokens:** capture existing desktop/mobile screenshots and route behavior. Define semantic colors, typography, geometry, glass, and motion tokens in `src/index.css`; update font imports in `src/main.tsx` where appropriate.
2. **Interaction prototype:** implement a small shared action treatment, appearance controls, and the floating Navbar. Validate glass contrast, button feel, mobile disclosure behavior, and reduced motion before extending the style.
3. **Homepage:** update Hero, ProjectsSection, FeaturedProjectCard, ProjectTable, Journal, About, Contact, and Footer. Preserve existing project/journal data and URL destinations.
4. **Reading views:** update BlogLayout, CodeBlock styles, relevant page-specific surfaces, and NotFoundPage. Check long titles and wide code samples.
5. **Motion cleanup:** replace blanket reveal wrappers, remove magnetic effects, and apply the limited motion vocabulary. Prefer CSS and browser animations; add a motion dependency only if the prototype shows a concrete need for interruptible spring/layout behavior.
6. **Verification and polish:** run build/lint, drive the site in real browsers, inspect screenshots, tune effects, and fix regressions. Keep this as a reviewable branch before any deployment.

## Verification criteria

- Test 360px, 390px, 768px, 1280px, and 1440px widths, both appearances, and 200% text/zoom. No clipped navigation, accidental horizontal page scrolling, or hidden anchor targets.
- Exercise all five article routes, direct URL loads, browser back/forward, home anchors, resume download, contact links, and code block readability. Preserve existing reading/privacy content.
- Keyboard-only navigation, visible focus, logical order, Escape dismissal, and appropriate focus after navigation. No nested links/buttons or inaccessible icon-only controls.
- Meet WCAG AA contrast targets (4.5:1 for normal text; 3:1 for large text and relevant UI boundaries). Measure against actual composited glass over both light and dark content.
- Respect reduced motion; use supported reduced-transparency/contrast preferences and forced-colors behavior. Provide a Solid surfaces appearance option because browsers do not expose every native accessibility setting consistently.
- Test Safari on macOS/iOS where available, plus Chrome and Firefox. Record any unavailable real-device testing instead of treating emulation as equivalent.
- Profile scrolling and menu/button interactions on a representative mobile device or throttled browser. Keep blur to small functional surfaces; animate transform/opacity rather than continuously recomputing large blur areas. No idle JavaScript animation loop.
- `npm run build` and `npm run lint` must pass, or baseline failures must be identified separately. Add behavior checks for the navigation disclosure and appearance persistence if an appropriate test harness is introduced; avoid tests that only restate CSS values.

## Boundaries and open tuning

The content structure and implementation direction are settled enough to begin. Exact blur strength, radii, motion curves, and the balance between the portrait and Navy media should be judged in the interaction prototype. Native-quality refraction is not a promised browser capability. The practical goal is recognizable Apple-inspired hierarchy, material, geometry, and responsiveness with reliable reading and navigation.

Blue-theme refinement: use cool blue backgrounds and blue-tinted glass throughout, with stronger blue actions. The original CodeBlock has no copy control; retain its existing highlighting behavior rather than inventing a preserved feature.
