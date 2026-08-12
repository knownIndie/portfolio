# Google Sheets portfolio CMS

## Decision

The Google Sheet is a private editing source. A deliberate menu action asks Vercel to rebuild the site. The build reads every required tab in one authenticated Google Sheets API `batchGet` request, validates the complete snapshot, and fails if the content is invalid.

Production never fetches the Sheet in a browser or on each page request. There is no public CSV endpoint, automatic `onEdit` publication, runtime revalidation, or database mirror.

An accepted Deploy Hook request means only **requested**. It does not mean the build or production deployment succeeded. Vercel remains the source of truth for deployment status.

## Workbook contract

Tab names and header rows are exact and case-sensitive. Do not rename or reorder columns without changing the parser and incrementing `schema_version`.

Every tab except `Control` uses a `state` column:

- `draft`: ignored by the website build
- `published`: included and strictly validated
- `archived`: ignored by the website build

Invalid state values fail validation even if the row would otherwise be ignored. Empty rows are ignored.

### `Control`

Headers:

| key | value |
| --- | ----- |

Required keys:

| key               | example                      | purpose                                                         |
| ----------------- | ---------------------------- | --------------------------------------------------------------- |
| `schema_version`  | `1`                          | Must match `GOOGLE_SHEETS_EXPECTED_SCHEMA_VERSION`.             |
| `content_version` | `2026-08-12.1`               | Human-readable release identifier. Change it before publishing. |
| `resume_path`     | `/Aryan_Bhardwaj_Resume.pdf` | Local path or valid URL used by the site.                       |

The Apps Script writes these request-only audit keys after Vercel accepts the hook request:

- `last_publish_status` with the literal value `requested`
- `last_publish_requested_at`
- `last_publish_requested_version`

These fields do not prove a successful deployment.

### `Profile`

Headers:

| key | value | state |
| --- | ----- | ----- |

Required published keys:

- `name`
- `headline`
- `short_bio`
- at least one of `about_1`, `about_2`, or `about_3`
- `location`
- `availability`
- `email`

Keys must be unique among published rows.

### `Projects`

Headers, in order:

| id  | slug | title | short_description | description | status | year | technologies_csv | repository_url | live_url | npm_url | image_path | role | featured | sort_order | state |
| --- | ---- | ----- | ----------------- | ----------- | ------ | ---- | ---------------- | -------------- | -------- | ------- | ---------- | ---- | -------- | ---------- | ----- |

Rules:

- Published `id` and `slug` values must be unique.
- `featured` must be `TRUE` or `FALSE`.
- `sort_order` must be a non-negative integer.
- Repository, live, and npm URLs must be valid HTTP or HTTPS URLs when present.
- `image_path` may be a local `/...` path or HTTP/HTTPS URL.
- `technologies_csv` is a comma-separated list.

### `ProjectHighlights`

| id  | project_id | highlight | sort_order | state |
| --- | ---------- | --------- | ---------- | ----- |

Published `project_id` values must reference a published project. Highlights are sorted by `sort_order`.

### `Experience`

| id  | organization | role | location | start_date | end_date | summary | technologies_csv | sort_order | state |
| --- | ------------ | ---- | -------- | ---------- | -------- | ------- | ---------------- | ---------- | ----- |

Published `id` values must be unique. `organization`, `role`, and `start_date` are required. Technologies are comma-separated.

### `ExperienceHighlights`

| id  | experience_id | highlight | sort_order | state |
| --- | ------------- | --------- | ---------- | ----- |

Published `experience_id` values must reference a published experience row. Highlights are sorted by `sort_order`.

### `Education`

| id  | institution | credential | field | start_date | end_date | summary | sort_order | state |
| --- | ----------- | ---------- | ----- | ---------- | -------- | ------- | ---------- | ----- |

Published `id` values must be unique. `institution` and `credential` are required.

### `Links`

| id  | type | label | url | sort_order | state |
| --- | ---- | ----- | --- | ---------- | ----- |

Allowed types are `email`, `github`, `linkedin`, `resume`, and `other`. URLs may be local `/...` paths, HTTP/HTTPS URLs, or `mailto:` URLs. Published IDs must be unique.

## Google Cloud and Sheet access

1. Create a Google Cloud project and enable the Google Sheets API.
2. Create a dedicated service account. Domain-wide delegation is not needed.
3. Create one JSON key for that account and store it securely. Never commit it.
4. Open the private portfolio Sheet and share only that file with the service-account email as **Viewer**.
5. Keep the Sheet unpublished. Do not enable “Anyone with the link”.
6. Restrict human edit access to people who are allowed to change portfolio content.

The application requests only `spreadsheets.readonly` scope. The service account has no reason to edit the Sheet.

## Application dependency and environment

Required runtime dependency:

```sh
npm install google-auth-library
```

The CMS implementation does not require Zod. Its pure parser performs strict header, type, state, uniqueness, URL, required-field, and foreign-key validation.

Set these variables in Vercel Production and any Preview environment that should use the Sheet:

```dotenv
GOOGLE_SHEETS_CMS_ENABLED=true
GOOGLE_SHEETS_SPREADSHEET_ID=the_spreadsheet_id
GOOGLE_SHEETS_CLIENT_EMAIL=portfolio-reader@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_EXPECTED_SCHEMA_VERSION=1
```

The spreadsheet ID is the value between `/d/` and `/edit` in the Sheet URL.

`isGoogleSheetsCmsConfigured()` is a side-effect-free check of the explicit enable flag. When the flag is absent or `false`, the application may use local fallback content. When the flag is `true`, missing credentials, authentication failures, API failures, and validation failures throw. The application must not catch those failures and silently serve fallback data, because that would let a broken content release appear successful.

Never prefix these variables with `NEXT_PUBLIC_`.

## Apps Script setup

1. In the Sheet, open **Extensions → Apps Script**.
2. Copy `scripts/google-apps-script/Code.gs` into `Code.gs`.
3. In Apps Script project settings, enable the manifest file and copy `appsscript.json` into it.
4. In Vercel, create one Production Deploy Hook for the production branch.
5. Treat the hook URL like a password. In Apps Script project settings, add the Script Property:
   - key: `VERCEL_DEPLOY_HOOK_URL`
   - value: the complete Vercel Deploy Hook URL
6. Run `onOpen` once in the Apps Script editor and approve the requested Sheet and external-request scopes.
7. Reload the Sheet. The **Portfolio** menu should contain:
   - **Validate content**
   - **Publish website**

There is intentionally no installable edit trigger and no `onEdit` function. Normal editing never publishes.

## Publishing

1. Edit content using `draft` rows as needed.
2. Change only approved rows to `published`.
3. Increment `Control.content_version`.
4. Optionally name the current Sheet version through **File → Version history → Name current version**.
5. Select **Portfolio → Validate content**. This catches tab, header, required Control key, schema version, and state mistakes. It is a fast preflight, not the authoritative application validation.
6. Select **Portfolio → Publish website** and confirm.
7. Apps Script validates again and sends one POST to the secret Deploy Hook.
8. If Vercel rejects the request, nothing is recorded as requested.
9. If Vercel accepts the request, Apps Script records only request metadata in `Control`.
10. Check the Vercel deployment page. The build loads all eight ranges in one Sheets API request and validates them before it can become production.

## Integration contract

Application wiring should import:

```ts
import {
  isGoogleSheetsCmsConfigured,
  loadPortfolioContentFromGoogleSheets,
} from "@/lib/portfolio-cms";
```

The intended build-time flow is:

```ts
const content = isGoogleSheetsCmsConfigured()
  ? await loadPortfolioContentFromGoogleSheets()
  : fallbackPortfolioContent;
```

Do not wrap the configured branch in a fallback-producing catch. A configured CMS failure must fail the candidate build.

The parser is separately unit-testable through `parsePortfolioContentFromValueRanges`. It accepts Google `valueRanges` data and an optional expected schema version.

## Failure behavior

| failure                                                   | expected result                                                                             |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| CMS disabled                                              | No Google request. Application may use checked-in fallback content.                         |
| CMS enabled but an environment variable is missing        | Build throws an actionable configuration error.                                             |
| Service account lacks Viewer access                       | Google returns an authorization/not-found failure and the build fails.                      |
| Header renamed or reordered                               | Parser reports the exact expected header and the build fails.                               |
| Duplicate published ID or slug                            | Parser identifies the duplicate and the build fails.                                        |
| Highlight references a draft, archived, or missing parent | Parser reports the unknown reference and the build fails.                                   |
| Malformed URL, boolean, integer, state, or email          | Parser reports the row/field and the build fails.                                           |
| Apps Script cannot reach Vercel                           | A dialog reports failure and no `requested` status is written.                              |
| Vercel accepts the hook but build fails                   | Sheet still says only `requested`; previous production remains active. Inspect Vercel logs. |
| Google is unavailable during build                        | Candidate build fails; previous production remains active. Retry publishing later.          |

## Rollback

For a bad content deployment:

1. Use Vercel Instant Rollback to restore the previous production deployment immediately.
2. In Google Sheets version history, restore the last known-good named version, or manually correct the bad rows.
3. Set a new `content_version` so the corrective release is traceable.
4. Validate and publish again.
5. Confirm the corrective Vercel deployment before considering the incident closed.

Rolling Vercel back does not roll the Sheet back. Restoring the Sheet does not change production until another deployment is requested. Both sources must be reconciled.

## Operational limits

This design is intentionally small. Do not add Postgres mirroring unless the product gains runtime writes, multiple authenticated editors, complex query requirements, or transactional content workflows. For the current portfolio, a database would create a second source of truth and a synchronization problem without improving the visitor experience.
