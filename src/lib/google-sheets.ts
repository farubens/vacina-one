import { google } from "googleapis";
import type { LeadPayload } from "./lead-mailer";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getGooglePrivateKey() {
  const encoded = process.env.GOOGLE_PRIVATE_KEY_BASE64;

  if (encoded) {
    return Buffer.from(encoded, "base64").toString("utf8");
  }

  return getRequiredEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
}

function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: getRequiredEnv("GOOGLE_CLIENT_EMAIL"),
      private_key: getGooglePrivateKey(),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function appendLeadToSheet(lead: LeadPayload) {
  const sheets = getSheetsClient();
  const spreadsheetId = getRequiredEnv("GOOGLE_SPREADSHEET_ID");
  const sheetName = getRequiredEnv("GOOGLE_SHEET_NAME");

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:F`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[new Date().toISOString(), lead.name, lead.phone, lead.email, lead.coupon, lead.vaccine]],
    },
  });
}
