# Aryan Bhardwaj portfolio

A dual-version Next.js portfolio with a modern canonical experience and an
explicitly preserved classic version.

## Routes

| Modern, canonical | Classic archive |
| ----------------- | --------------- |
| `/`               | `/v1`           |
| `/about`          | `/v1/about`     |
| `/projects`       | `/v1/projects`  |
| `/resume`         | `/v1/resume`    |

Every page includes a real-link Modern/Classic control that keeps visitors on
the equivalent page. Modern routes are included in the sitemap. Classic routes
are `noindex` and point to their modern counterparts with canonical metadata.

The blog is deliberately deferred and has no route or rendered UI.

## Content

The app uses checked-in fallback content from `src/lib/portfolio/fallback.ts`
for local development. Production can read a private Google Sheet during the
Vercel build by setting `GOOGLE_SHEETS_CMS_ENABLED=true` and the credentials in
`.env.example`.

The Sheet remains private. A Viewer-only service account reads the workbook in
one batch request. Invalid content fails the candidate build, leaving the
existing production deployment intact.

Complete workbook, Google Cloud, Apps Script, publishing, failure, and rollback
instructions are in [`docs/google-sheets-cms.md`](docs/google-sheets-cms.md).

## One-click publishing from Google Sheets

Copy `scripts/google-apps-script/Code.gs` and `appsscript.json` into a bound Apps
Script project. The script adds this menu:

```text
Portfolio
├── Validate content
└── Publish website
```

`Publish website` validates the workbook, asks for confirmation, and calls a
secret Vercel Deploy Hook stored in Apps Script Properties. It records only
`requested`, never a false success state. There is no automatic `onEdit`
deployment.

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. With the default environment, the app uses local
fallback content and makes no Google request.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

The repository keeps both npm and pnpm lockfiles in sync.
