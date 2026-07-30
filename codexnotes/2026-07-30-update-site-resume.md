# Update the site resume

## What changed

- Replaced `public/Resume.pdf` with the supplied technology consulting resume.
- Kept the public filename as `Resume.pdf`, matching the existing navbar download
  link.

## PDF verification

- Confirmed the source and site copy have the same SHA-256 hash.
- Confirmed the PDF is one unencrypted US Letter page with no forms or JavaScript.
- Rendered the source and copied file at 150 DPI and visually checked the complete
  page for clipping, overlap, unreadable text, or broken layout.

## Build verification

- `npm run build`
- Confirmed `dist/Resume.pdf` has the same SHA-256 hash as the supplied source.
- `git diff --check`

## Scope

Only `public/Resume.pdf` and this note belong to the commit. The unrelated
`.idea/inspectionProfiles/` directory remains untouched.
