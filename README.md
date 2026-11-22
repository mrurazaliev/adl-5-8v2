# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Vercel deployment

Frontend: React Router SPA + Vite. `vercel.json` sets Vite, `npm run build`, `dist`, and the SPA rewrite to `/index.html`. Root Directory must be the repository root (the folder containing `package.json` and `vercel.json`). Direct requests and refreshes on `/login`, `/register`, and `/dashboard` must serve the SPA; protected application routes still require login.

### Backend is required separately

The backend currently runs only on the developer's computer at `http://localhost:4000`. No public backend URL has been provided. Vercel hosts this frontend, not the separate Express/PostgreSQL backend. Registration cannot work publicly until the existing backend is deployed at a reachable HTTPS URL.

In Vercel Settings > Environment Variables, set `VITE_API_BASE_URL` to the **actual public HTTPS backend origin**, for Production and any Preview environments that need API access. Do not use localhost or the frontend domain, and do not append `/api`: the existing request paths already include `/api/auth/register` and `/api/auth/login`. No public API address is guessed or supplied by this repository.

- Registration: `POST ${VITE_API_BASE_URL}/api/auth/register`; body remains `name`, `email`, `password`.
- Login: `POST ${VITE_API_BASE_URL}/api/auth/login`; body remains `email`, `password`.
- If the variable is missing, relative requests target the frontend origin. A static frontend does not implement these API routes; an SPA rewrite does not turn them into backend endpoints.
- Vite embeds `VITE_` variables at build time. Changing a variable requires a new build/redeploy. These variables are public browser configuration; never put passwords, database URLs or JWT secrets in them.
- Builds on Vercel (`VERCEL=1`) reject a missing/malformed API URL, HTTP/loopback, the frontend's Vercel system-variable hosts, credentials, and a duplicated `/api` suffix. Local production builds/previews continue to support the local `.env` for development verification. This check validates configuration, not backend availability.

### Project settings to verify in Vercel Dashboard

1. Framework Preset: **Vite**; Build Command: **npm run build**; Output Directory: **dist**.
2. Root Directory: repository root; connected repository: `mrurazaliev/adl-5-8v2`; Production Branch: **main**.
3. Check `VITE_API_BASE_URL` in the environment used by the deployment. No public backend exists yet; do not set a fabricated address.
4. The supplied deployment URL returned HTTP 302 to Vercel Authentication for `/`, `/login`, `/register`, and `/dashboard` during diagnosis. Review Deployment Protection with the project owner and use the intended production URL/audience. Authentication protection prevents independent verification of its bundle and deployed SHA; do not bypass it.
5. Compare the deployment's Git commit SHA with the intended commit, check build logs and project-level overrides, then deploy that exact commit after the backend URL is configured. This task does not push or redeploy automatically.

### Backend connectivity checks after publication

Check the actual backend's `/health` and `/docs.json`, HTTPS certificate, and `OPTIONS /api/auth/register` and `/api/auth/login` from the frontend Origin. CORS must allow the intended frontend origin, POST, Content-Type and Authorization as needed. The existing backend reads `CORS_ORIGIN`; configuration must be reviewed by its owner. No backend/CORS changes are made here. Avoid HTTP API calls from an HTTPS page (Mixed Content). Do not create production accounts just to test routing.

### Local production preview

Run `npm run build`, then `npm run preview -- --host 127.0.0.1 --port 4173 --strictPort`. Confirm that `/`, `/login`, `/register`, `/dashboard`, and repeated requests return the built `index.html`, and the referenced asset URLs return JavaScript/CSS. Vite preview checks production artifacts and its local SPA fallback; the Vercel rewrite still needs verification after an authorized redeploy. An HTTP fallback check alone does not prove registration or login works.

References: https://vercel.com/docs/frameworks/frontend/vite and https://vite.dev/guide/env-and-mode
