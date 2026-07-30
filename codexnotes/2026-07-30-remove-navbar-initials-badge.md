# Remove navbar initials badge

## What changed

- Removed the blue `EG` square from the shared navigation brand.
- Kept `Efraim Grebnev` as the home link.
- Removed the badge-only layout and styling rules that were no longer used.

## Verification

- `npm run lint`
- `npm run build`
- `git diff --check`

## Scope

Only the navbar component, its stylesheet, and this note belong to the change.
The unrelated `.idea/inspectionProfiles/` directory remains untouched.
