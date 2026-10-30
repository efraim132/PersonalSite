# Design work checklist

- [x] Read the Principles section of Poteto Mode.
- [x] Phase A: Frame. Keep the existing routes and content. Deliver blue Apple-inspired navigation, buttons, motion, light and dark appearances, and readable articles.
- [x] Phase B: Design the workflow. Use the approved design plan. Capture a baseline, implement shared appearance and navigation, update content layouts, then verify browser behavior.
- [x] Phase C: Run the loop.
- [x] Ground.
- [x] Sketch. Compare root context with local appearance settings before implementation.
- [x] Agree. Proceed under the approved plan.
- [x] Implement. Check shared controls before extending page styling.
- [x] Scrap. Skipped because implementation and checks supported the chosen structure.
- [x] Phase D: Keep the audit trail.
- [x] Phase E: Verify and hand back.

Done means the production build and lint pass, browser checks preserve routes and links, menu/appearance controls work with keyboard and touch, and screenshots show readable layouts at mobile and desktop sizes. Verify dark, light, reduced motion, solid surfaces, and enlarged text.

The work covers shared styles and roughly a dozen visible components. Use one implementation owner and independent read-only reviews. Existing components already separate content from presentation. No new page framework is needed. The critical unknown is glass contrast across appearances, so test navigation first.

The requested control-ui skill and the default non-OpenAI models referenced by Poteto are not installed in this environment. Use Playwright against the actual site and the available review agents. No claim of cross-family review will be made.

Final results are recorded in [design-verification.md](design-verification.md). The implementation uses the approved structure and blue-theme refinement.
