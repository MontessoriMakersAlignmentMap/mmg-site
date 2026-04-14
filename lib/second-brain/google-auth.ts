import { google } from 'googleapis'

/**
 * Service-account auth for the Second Brain Drive ingester.
 *
 * Reuses the existing `mmg-automations@mmg-automations-493012.iam.gserviceaccount.com`
 * service account (same one used by field-pulse-digest, etc.).
 *
 * For Hannah's personal Drive folders AND info@montessorimakersgroup.org folders:
 * share each top-level folder with the service account email as Viewer.
 *
 * If you later need full domain-wide access to info@, configure domain-wide
 * delegation on the service account and swap this for a JWT with a subject.
 */
export function getGoogleAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: [
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/documents.readonly',
      'https://www.googleapis.com/auth/spreadsheets.readonly',
      'https://www.googleapis.com/auth/presentations.readonly',
    ],
  })
}
