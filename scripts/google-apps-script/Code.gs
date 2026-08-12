const PORTFOLIO_MENU_NAME = "Portfolio";
const DEPLOY_HOOK_PROPERTY = "VERCEL_DEPLOY_HOOK_URL";

const PORTFOLIO_HEADERS = Object.freeze({
  Control: ["key", "value"],
  Profile: ["key", "value", "state"],
  Projects: [
    "id",
    "slug",
    "title",
    "short_description",
    "description",
    "status",
    "year",
    "technologies_csv",
    "repository_url",
    "live_url",
    "npm_url",
    "image_path",
    "role",
    "featured",
    "sort_order",
    "state",
  ],
  ProjectHighlights: ["id", "project_id", "highlight", "sort_order", "state"],
  Experience: [
    "id",
    "organization",
    "role",
    "location",
    "start_date",
    "end_date",
    "summary",
    "technologies_csv",
    "sort_order",
    "state",
  ],
  ExperienceHighlights: [
    "id",
    "experience_id",
    "highlight",
    "sort_order",
    "state",
  ],
  Education: [
    "id",
    "institution",
    "credential",
    "field",
    "start_date",
    "end_date",
    "summary",
    "sort_order",
    "state",
  ],
  Links: ["id", "type", "label", "url", "sort_order", "state"],
});

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu(PORTFOLIO_MENU_NAME)
    .addItem("Validate content", "validatePortfolioContent")
    .addItem("Publish website", "publishPortfolioWebsite")
    .addToUi();
}

function validatePortfolioContent() {
  const result = validateWorkbook_();
  const ui = SpreadsheetApp.getUi();

  if (result.errors.length > 0) {
    ui.alert(
      "Portfolio content is invalid",
      result.errors.map((error) => `• ${error}`).join("\n"),
      ui.ButtonSet.OK,
    );
    return false;
  }

  ui.alert(
    "Portfolio content passed the Sheet checks",
    "The Vercel build performs the authoritative validation before deployment. No deployment was requested.",
    ui.ButtonSet.OK,
  );
  return true;
}

function publishPortfolioWebsite() {
  const ui = SpreadsheetApp.getUi();
  const result = validateWorkbook_();

  if (result.errors.length > 0) {
    ui.alert(
      "Publish blocked",
      result.errors.map((error) => `• ${error}`).join("\n"),
      ui.ButtonSet.OK,
    );
    return;
  }

  const confirmation = ui.alert(
    "Request a portfolio deployment?",
    `Content version: ${result.contentVersion}\n\nThis requests a Vercel build. It does not prove that the build or deployment succeeds.`,
    ui.ButtonSet.YES_NO,
  );
  if (confirmation !== ui.Button.YES) return;

  const deployHookUrl =
    PropertiesService.getScriptProperties().getProperty(DEPLOY_HOOK_PROPERTY);
  if (!deployHookUrl) {
    ui.alert(
      "Publish blocked",
      `Script Property ${DEPLOY_HOOK_PROPERTY} is missing. Add the secret Vercel Deploy Hook URL in Apps Script project settings.`,
      ui.ButtonSet.OK,
    );
    return;
  }

  const requestedAt = new Date().toISOString();
  let response;
  try {
    response = UrlFetchApp.fetch(deployHookUrl, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        source: "google-sheets-portfolio",
        contentVersion: result.contentVersion,
        requestedAt,
      }),
      muteHttpExceptions: true,
      followRedirects: true,
    });
  } catch (error) {
    ui.alert(
      "Deployment request failed",
      `Apps Script could not call the Deploy Hook: ${String(error)}`,
      ui.ButtonSet.OK,
    );
    return;
  }

  const statusCode = response.getResponseCode();
  if (statusCode < 200 || statusCode >= 300) {
    ui.alert(
      "Deployment request rejected",
      `Vercel returned HTTP ${statusCode}. No requested status was recorded. Check the Deploy Hook and Apps Script execution log.`,
      ui.ButtonSet.OK,
    );
    return;
  }

  setControlValue_("last_publish_status", "requested");
  setControlValue_("last_publish_requested_at", requestedAt);
  setControlValue_("last_publish_requested_version", result.contentVersion);

  ui.alert(
    "Deployment requested",
    "Vercel accepted the request. This Sheet records only requested status. Check Vercel for the build and production result.",
    ui.ButtonSet.OK,
  );
}

function validateWorkbook_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const errors = [];

  Object.keys(PORTFOLIO_HEADERS).forEach((sheetName) => {
    const sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      errors.push(`Missing required tab: ${sheetName}`);
      return;
    }

    const expected = PORTFOLIO_HEADERS[sheetName];
    const actual = sheet
      .getRange(1, 1, 1, expected.length)
      .getDisplayValues()[0]
      .map((value) => value.trim());
    if (actual.join("\u001f") !== expected.join("\u001f")) {
      errors.push(`${sheetName} row 1 must be exactly: ${expected.join(", ")}`);
    }
  });

  const control = readControlValues_(errors);
  ["schema_version", "content_version", "resume_path"].forEach((key) => {
    if (!control[key]) errors.push(`Control is missing required key: ${key}`);
  });
  if (control.schema_version && control.schema_version !== "1") {
    errors.push(
      `Control schema_version must be 1, received ${control.schema_version}`,
    );
  }

  Object.keys(PORTFOLIO_HEADERS)
    .filter((name) => !["Control"].includes(name))
    .forEach((sheetName) => validateStates_(spreadsheet, sheetName, errors));

  return {
    errors,
    contentVersion: control.content_version || "unknown",
  };
}

function readControlValues_(errors) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Control");
  if (!sheet) return {};

  const values = sheet.getDataRange().getDisplayValues().slice(1);
  const control = {};
  values.forEach((row, index) => {
    const key = String(row[0] || "").trim();
    const value = String(row[1] || "").trim();
    if (!key && !value) return;
    if (!key) errors.push(`Control row ${index + 2} has a value without a key`);
    if (key && Object.prototype.hasOwnProperty.call(control, key)) {
      errors.push(`Control contains duplicate key: ${key}`);
    }
    if (key) control[key] = value;
  });
  return control;
}

function validateStates_(spreadsheet, sheetName, errors) {
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() < 2) return;
  const headers = PORTFOLIO_HEADERS[sheetName];
  const stateColumn = headers.indexOf("state") + 1;
  if (stateColumn === 0) return;

  const states = sheet
    .getRange(2, stateColumn, sheet.getLastRow() - 1, 1)
    .getDisplayValues();
  states.forEach((row, index) => {
    const state = String(row[0] || "")
      .trim()
      .toLowerCase();
    if (!state) return;
    if (!["draft", "published", "archived"].includes(state)) {
      errors.push(
        `${sheetName} row ${index + 2} state must be draft, published, or archived`,
      );
    }
  });
}

function setControlValue_(key, value) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Control");
  if (!sheet) throw new Error("Control tab is missing");

  const values = sheet.getDataRange().getDisplayValues();
  for (let row = 1; row < values.length; row += 1) {
    if (String(values[row][0] || "").trim() === key) {
      sheet.getRange(row + 1, 2).setValue(value);
      return;
    }
  }
  sheet.appendRow([key, value]);
}
