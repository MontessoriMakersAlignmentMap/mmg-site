# HeyGen Video Generation Automation — Zapier Build Guide

## Overview

Three Zaps that generate avatar videos for all 512 MMR Residency lessons via the HeyGen API, check for completion, and push video URLs to the platform.

---

## Pre-Automation: Google Sheet Updates

### Add these columns to both Primary and Elementary sheets:

| Column | Position | Purpose |
|--------|----------|---------|
| Batch | Between Sequence (D) and Lesson Title (E) — new column E | Controls which rows process in each run |
| Retry Count | After Notes (O) — new column P | Tracks retry attempts after errors |
| Completed At | After Video URL (M) — new column N (shift others right) | Timestamp when video completed |

### Updated column order:
A: Row Number, B: Level, C: Strand, D: Sequence, E: Batch, F: Lesson Title, G: Script Text, H: Avatar ID, I: Voice ID, J: Aspect Ratio, K: Status, L: Video ID, M: Video URL, N: Completed At, O: Platform Upload Status, P: Notes, Q: Retry Count

### Batch assignments:
- Rows 1-5: Batch 1 (test batch)
- Rows 6-55: Batch 2
- Rows 56-105: Batch 3
- Continue in groups of 50 through Batch 11 (remaining rows)

---

## Zap 0: One-Time Setup Zap (Avatar + Voice Population)

Run this ONCE before the main automation.

### Step 1 — Trigger: Manual (Zapier "Run Once")

### Step 2 — Webhooks by Zapier: GET
- URL: `https://api.heygen.com/v2/voices`
- Headers: `X-Api-Key: {{your_heygen_api_key}}`
- This returns the full voice list

### Step 3 — Code by Zapier (JavaScript)
Parse the voices response to find Hope and Theo voice IDs:
```javascript
const voices = JSON.parse(inputData.voices_response);
const hopeVoice = voices.data.voices.find(v => v.display_name.includes('Hope'));
const theoVoice = voices.data.voices.find(v => v.display_name.includes('Theo'));
return {
  hope_voice_id: hopeVoice ? hopeVoice.voice_id : 'NOT_FOUND',
  theo_voice_id: theoVoice ? theoVoice.voice_id : 'NOT_FOUND'
};
```

### Step 4 — Google Sheets: Update Many Rows (Primary sheet)
- Spreadsheet: MMR_HeyGen_Scripts
- Sheet: Primary
- Column H (Avatar ID): `bf9f775061c344e18736ad37efd639fd` for ALL rows
- Column I (Voice ID): `{{hope_voice_id}}` for ALL rows

Note: Zapier's bulk update is limited. You may need to use a Looping by Zapier step to iterate through rows, or manually paste the avatar/voice IDs into the sheet columns since this is a one-time operation. The fastest approach:
1. Run Steps 1-3 to get the voice IDs
2. Manually paste into the sheet:
   - Primary sheet, column H all rows: `bf9f775061c344e18736ad37efd639fd`
   - Primary sheet, column I all rows: the Hope voice ID from Step 3
   - Elementary sheet, column H all rows: `c21fcda92951474299ce425308a8e802`
   - Elementary sheet, column I all rows: the Theo voice ID from Step 3

---

## Zap 1: Main Video Generation Zap

### Step 1 — Trigger: Google Sheets — New or Updated Spreadsheet Row
- Spreadsheet: MMR_HeyGen_Scripts
- Worksheet: Primary (duplicate this Zap for Elementary, or use a single Zap with both sheets)
- Trigger column: K (Status)

### Step 2 — Filter by Zapier
Only continue if ALL of these conditions are met:
- Status (K) exactly equals `Pending`
- Script Text (G) is not empty
- Avatar ID (H) is not empty
- Voice ID (I) is not empty
- Batch (E) exactly equals `1` (change this number to advance through batches)

### Step 3 — Google Sheets: Update Spreadsheet Row
- Row: Use the row number from the trigger
- Status (K): `Generating`

### Step 4 — Webhooks by Zapier: POST
- URL: `https://api.heygen.com/v2/video/generate`
- Payload type: JSON
- Headers:
  - `X-Api-Key`: `{{your_heygen_api_key}}`
  - `Content-Type`: `application/json`
- Body (raw JSON):

```json
{
  "video_inputs": [
    {
      "character": {
        "type": "avatar",
        "avatar_id": "{{Avatar ID from row}}",
        "avatar_style": "normal"
      },
      "voice": {
        "type": "text",
        "input_text": "{{Script Text from row}}",
        "voice_id": "{{Voice ID from row}}",
        "speed": 0.95
      },
      "background": {
        "type": "color",
        "value": "#0e1a7a"
      }
    }
  ],
  "dimension": {
    "width": 1920,
    "height": 1080
  },
  "caption": false,
  "title": "{{Level}} - {{Strand}} - {{Lesson Title}}"
}
```

### Step 5 — Paths by Zapier

**Path A: Success** (API response status is 200 and video_id exists)
- Go to Step 6A

**Path B: Rate Limited** (API response status is 429)
- Go to Step 6B

**Path C: Other Error** (API response status is not 200 and not 429)
- Go to Step 6C

### Step 6A — Google Sheets: Update Spreadsheet Row (Success)
- Video ID (L): `{{video_id from API response}}`
- Status (K): `Generating`

### Step 6B — Delay by Zapier
- Wait 60 seconds
- Then retry: Webhooks by Zapier POST (same as Step 4)
- If retry succeeds, update Video ID and Status as in 6A
- If retry fails, update Status to `Error`, Notes to `Rate limited after retry`, increment Retry Count

### Step 6C — Google Sheets: Update Spreadsheet Row (Error)
- Status (K): `Error`
- Notes (P): `{{error message from API response}}`

### Step 7 — Delay by Zapier
- Wait 20 seconds (breathing room between API calls)

---

## Zap 2: Video Completion Checker

### Step 1 — Trigger: Schedule by Zapier
- Frequency: Every 30 minutes

### Step 2 — Google Sheets: Lookup Spreadsheet Rows
- Spreadsheet: MMR_HeyGen_Scripts
- Lookup column: K (Status)
- Lookup value: `Generating`
- This returns all rows with Generating status

### Step 3 — Looping by Zapier
Loop through each row returned in Step 2.

### Step 4 — Webhooks by Zapier: GET (inside loop)
- URL: `https://api.heygen.com/v1/video_status.get?video_id={{Video ID from row}}`
- Headers: `X-Api-Key: {{your_heygen_api_key}}`

### Step 5 — Paths by Zapier (inside loop)

**Path A: Completed** (status field equals "completed")
- Google Sheets: Update Spreadsheet Row
  - Video URL (M): `{{video_url from API response}}`
  - Status (K): `Complete`
  - Completed At (N): `{{current timestamp}}`

**Path B: Processing** (status field equals "processing")
- Do nothing. The next scheduled run will check again.

**Path C: Failed** (status field equals "failed")
- Google Sheets: Update Spreadsheet Row
  - Status (K): `Error`
  - Notes (P): `{{error details from API response}}`

---

## Zap 3: Platform Upload (Supabase)

### Step 1 — Trigger: Google Sheets — New or Updated Spreadsheet Row
- Spreadsheet: MMR_HeyGen_Scripts
- Trigger column: K (Status)

### Step 2 — Filter by Zapier
Only continue if:
- Status (K) exactly equals `Complete`
- Video URL (M) is not empty
- Platform Upload Status (O) does not equal `Uploaded`

### Step 3 — Webhooks by Zapier: POST
Call the Supabase REST API to update the lesson record.

**Important database context:**
- Table: `residency_lessons`
- Video URLs are stored in the `file_urls` column (text array)
- Lessons are identified by matching through `strand_id` and `level_id` foreign keys plus `title`
- You need to join through `residency_strands` (has a `name` column) and `residency_levels` (has a `name` column)

Because Supabase REST API joins are complex for updates, the cleanest approach is a two-step process:

**Step 3a — Webhooks by Zapier: GET (lookup the lesson ID)**
- URL: `https://lroxicwzhtzaitfkvzlv.supabase.co/rest/v1/residency_lessons?select=id,file_urls,residency_strands!inner(name),residency_levels!inner(name)&residency_strands.name=eq.{{Strand from row}}&residency_levels.name=eq.{{Level from row}}&title=eq.{{Lesson Title from row}}`
- Headers:
  - `apikey`: `{{SUPABASE_SERVICE_ROLE_KEY}}`
  - `Authorization`: `Bearer {{SUPABASE_SERVICE_ROLE_KEY}}`

**Step 3b — Webhooks by Zapier: PATCH (update the lesson)**
- URL: `https://lroxicwzhtzaitfkvzlv.supabase.co/rest/v1/residency_lessons?id=eq.{{lesson_id from Step 3a}}`
- Headers:
  - `apikey`: `{{SUPABASE_SERVICE_ROLE_KEY}}`
  - `Authorization`: `Bearer {{SUPABASE_SERVICE_ROLE_KEY}}`
  - `Content-Type`: `application/json`
  - `Prefer`: `return=minimal`
- Body: `{"file_urls": ["{{Video URL from row}}"]}`

Note: If the lesson already has file_urls you want to keep, you need to append rather than replace. Use a Code by Zapier step to merge the existing array with the new URL:
```javascript
const existing = JSON.parse(inputData.existing_file_urls || '[]');
existing.push(inputData.new_video_url);
return { updated_file_urls: JSON.stringify(existing) };
```

### Step 4 — Google Sheets: Update Spreadsheet Row
- Platform Upload Status (O): `Uploaded`

### Step 5 — Filter/Error Path
If Step 3a returns no results (lesson not found in Supabase):
- Platform Upload Status (O): `Not Found`
- Notes (P): `No matching lesson in Supabase for {{Level}} / {{Strand}} / {{Lesson Title}}`

---

## Summary Tab Updates

Add these formulas to the Summary tab:

| Metric | Formula |
|--------|---------|
| Total Pending | `=COUNTIF(Primary!K:K,"Pending")+COUNTIF(Elementary!K:K,"Pending")` |
| Total Generating | `=COUNTIF(Primary!K:K,"Generating")+COUNTIF(Elementary!K:K,"Generating")` |
| Total Complete | `=COUNTIF(Primary!K:K,"Complete")+COUNTIF(Elementary!K:K,"Complete")` |
| Total Error | `=COUNTIF(Primary!K:K,"Error")+COUNTIF(Elementary!K:K,"Error")` |
| Avg Generation Time (min) | Calculate from Completed At minus the timestamp when Status changed to Generating (requires adding a "Generation Started" column, or estimate 4 min/video) |
| Est. Time Remaining | `=(Pending Count * 4) / 60` hours (based on 4 min avg per video) |

---

## Setup Instructions Tab (add to the Google Sheet)

### How to Run the HeyGen Video Generation Pipeline

**Step 1: Run the Setup Zap**
Run Zap 0 once. This populates the Avatar ID and Voice ID columns for every row. Verify that column H has avatar IDs and column I has voice IDs on both sheets before proceeding.

**Step 2: Run the Test Batch**
The first 5 rows are assigned to Batch 1. Open Zap 1 (Main Video Generation) and make sure the Batch filter is set to 1. Turn on the Zap. It will process the 5 test rows one at a time with 20-second delays between them.

**Step 3: Turn On the Completion Checker**
Turn on Zap 2 (Video Completion Checker). It runs every 30 minutes and checks whether generating videos are done. Within 1-2 runs your test videos should show Complete status with Video URLs filled in.

**Step 4: Verify the Test Batch**
Check that all 5 test rows show Status = Complete and have Video URLs. Open one or two URLs to verify the videos look correct (right avatar, right voice, navy background, correct script). If any show Error, check the Notes column for details.

**Step 5: Process Remaining Batches**
Once the test batch is confirmed working, advance through batches:
1. Open Zap 1 and change the Batch filter from 1 to 2
2. The Zap will process the next 50 rows
3. Let the completion checker run overnight
4. Next morning check the Summary tab for progress
5. Change to Batch 3 and repeat

Each batch of 50 takes roughly 17 minutes of API calls (50 rows x 20 seconds between calls) plus 3-5 minutes generation time per video. The completion checker handles the rest.

**Step 6: Retry Errors**
If any rows show Error status:
1. Read the Notes column to understand what went wrong
2. Fix the issue if needed (empty script, etc.)
3. Change Status back to Pending
4. The next Zap run will pick it up automatically

**Step 7: Platform Upload**
Once videos are Complete, Zap 3 automatically pushes video URLs to the Residency platform in Supabase. Check the Platform Upload Status column. "Uploaded" means the video URL is live on the lesson page. "Not Found" means the lesson title did not match a record in Supabase and needs manual review.

### Overnight Run Strategy
To process the full library overnight:
1. Set the Batch filter to include all remaining batches (or remove the batch filter entirely)
2. Turn on all three Zaps before bed
3. The generation Zap processes rows sequentially with 20-second gaps
4. The checker Zap runs every 30 minutes catching completions
5. The upload Zap pushes URLs to the platform as they complete
6. Check the Summary tab in the morning

At 20 seconds between API calls, 512 videos take about 2.8 hours of API call time. With 3-5 minute generation times and the checker running every 30 minutes, expect the full library to be done within 6-8 hours overnight.
