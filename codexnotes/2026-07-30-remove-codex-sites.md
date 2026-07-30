# Remove the chatgpt.site deployment integration

## Local cleanup

- Removed `.openai/hosting.json`.
- Removed the Codex Sites-specific Worker packaging script.
- Restored the normal Vite build command.
- Restored Vite's normal `dist` build output.
- Removed the mistakenly added GitHub Pages deployment workflow.
- Kept the obsolete Jekyll workflow deletion because Cloudflare handles the
  deployment directly.

## Correct Cloudflare deployment target

- Cloudflare project: `personalsite`
- GitHub repository: `efraim132/PersonalSite`
- Production branch: `ReactRework`
- Build command: `npm run build`
- Output directory: `dist`
- Custom domain: `efraim.us`
- Deployment method: push `ReactRework`; Cloudflare's Git integration builds
  and deploys it automatically.

The separate `grebco-site` Worker serves `greb.co` and was not changed.

## Remaining external preview

The removed Codex Sites project still has an owner-only `chatgpt.site` preview.
The Sites connector available in this task does not provide a delete,
unpublish, or archive operation. Its repository integration is gone and it is
not the deployment target for this portfolio.
