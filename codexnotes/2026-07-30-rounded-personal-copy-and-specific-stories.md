# Rounded personal theme and specific project stories

## What changed

- Kept the restored dark blue palette and softened the square visual system with
  four reusable corner-radius sizes.
- Rounded buttons, navigation controls, project cards, story cards, code blocks,
  photos, contact cards, and mobile surfaces without turning them into pills.
- Replaced portfolio-sales language with a more personal project-archive voice.
- Featured the existing ComputerCraft EENet and SuperLua stories alongside the
  three newer project stories.
- Rewrote the GrebKey story around concrete problems and fixes:
  stale cached validations, Stripe billing reconciliation, and an incomplete
  bearer-auth definition in the generated OpenAPI document.
- Rewrote the private transcription story around concrete problems and fixes:
  real-audio health checks, duplicate fallback provisioning, safe request draining,
  and persisted incident controls.
- Named the wedding project as a wedding image sharing service and explained
  upload-time previews, atomic storage reservations, isolated guest collections,
  and revocable shares.
- Reduced the contact section to the heading "Contact me" and the four existing
  contact links.

## Privacy boundary

The public copy does not include the wedding participants, dates, locations,
private links, uploaded media, credentials, storage identifiers, provider names,
customer data, alert destinations, or the identity of the private transcription
product.

## Verification

- `npm run lint`
- `npm run build`
- `git diff --check`
- Desktop browser review of the featured project layout
- Mobile browser review at 390 by 844 pixels for the wedding story and contact
  section
- Confirmed no horizontal overflow on the reviewed mobile story

## Git status

These changes are intentionally left uncommitted and unpushed so they can be
reviewed before publishing. The unrelated `.idea/inspectionProfiles/` directory
was not touched.
