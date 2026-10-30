# Design verification

The blue Apple-inspired redesign is implemented on `feat/macos-design-rework`. No deployment was performed.

## Results

- `npm run build` passes.
- `npm run lint` passes.
- `npm run test:e2e -- --workers=2` passes all 54 checks across Chromium and Firefox.
- Production preview smoke checks load the homepage, five article routes, and the not-found page without uncaught browser errors.
- Desktop and mobile screenshots were inspected in light and dark appearances. Article views were also inspected.

The browser suite checks mobile disclosure behavior, Escape and focus return, repeated section navigation, direct routes, malformed fragments, browser history, resume download, muted video autoplay and pause/resume, saved appearance, blocked storage, forced-color selection, reduced motion, 200% text, and horizontal overflow at five widths.

Automated axe checks cover the homepage and appearance controls in light and dark appearances at mobile and desktop widths, plus the SuperLua article and syntax highlighting in both appearances. Automated checks do not replace a full assistive-technology audit.

The first checks exposed enlarged-text overflow, repeated-anchor scrolling, forced-color selection, and article links distinguished only by color. Those issues were fixed and the checks now pass.

## Reproduce

```sh
npm ci
npx playwright install --with-deps chromium firefox
npm run build
npm run lint
npm run test:e2e -- --workers=2
```

For the production smoke check, start `npm run preview -- --host 127.0.0.1 --port 8081`, then run `node scripts/check-production.mjs`.

For visual captures, start `npm run dev` in a separate terminal, then run `node scripts/capture-design.mjs`. The capture script uses port 8080.

Local results are in `artifacts/browser-tests.txt`, `artifacts/build.txt`, `artifacts/lint.txt`, and `artifacts/production-smoke.txt`. Screenshots are in the same directory. Generated artifacts are ignored by Git. The decisions are recorded in [design-decisions.tsv](design-decisions.tsv).

## Limits

The 200% test enlarges root text, not browser zoom. Safari, physical iOS devices, and screen-reader interaction were not tested in this Linux workspace. Independent review used the available model, not the cross-family models named in Poteto Mode. The baseline npm audit reported six existing dependency vulnerabilities. Dependency security remediation was outside this design change.

The static build is in `dist`. Hosting and direct-route fallback on the future beta Worker remain unverified until that Worker is configured. The local dev server remains on port 8080.

## Implementation choices

Model the Domain kept appearance as two explicit preferences with one owner. Prove It Works led to repeatable browser checks and a separate production smoke check. The homepage uses the existing Navy video through a derived still poster, muted autoplay, and a pause/resume control. The old magnetic cursor effect and blanket reveal wrappers were removed after their callers were migrated.

Review accepted the storage-failure comment because browser storage availability is outside the code's control. No comment suppressions or unresolved constraint comments were added.

Final independent same-model audit found no new blocking defect. Its reproducibility concern was addressed by preserving `scripts/check-production.mjs`. The work checklist is complete. Browser and assistive-technology limits above remain.
