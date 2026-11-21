<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./public/brand/g/midnight/signature.svg">
  <img src="./public/brand/g/ice/signature.svg" width="420" alt="Efraim Grebnev">
</picture>

# Projects and build notes

My personal site collects the software and hardware I build, what broke along the way, and how I fixed it.

[Visit the site](https://efraim.us) · [Browse projects](https://efraim.us/#projects) · [Read the stories](https://efraim.us/#writing)

## The monogram

The original Busbar EG used three electrical rails to draw the E. The current mark folds both initials into one upright G. The design article shows both marks and the sketches between them.

[Read the design story](https://efraim.us/writing/designing-busbar-eg) · [Brand guidelines and downloads](https://efraim.us/brand)

## Local development

The site uses React, TypeScript, React Router, and Vite. From the repository root, run:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite.

| Command | Purpose |
| --- | --- |
| `npm run lint` | Check the source with ESLint |
| `npm run build` | Type-check and create the production site in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run test:e2e` | Run the Playwright browser tests |

## Where things live

| Path | Contents |
| --- | --- |
| [src/pages](./src/pages) | Project stories, articles, and brand guidelines |
| [src/components](./src/components) | Homepage sections, navigation, and shared layouts |
| [src/data](./src/data) | Project listings and journal entries |
| [public/brand](./public/brand) | Original Busbar artwork, design studies, and current logo exports |
