#!/usr/bin/env python3
"""
Import 512 Montessori lesson .docx files into residency_lessons table.
Parses structured content from each docx and maps folder structure to
level/strand/category IDs in Supabase.
"""

import os
import re
import json
import urllib.request
import urllib.error
from docx import Document

# ─── Supabase config ───────────────────────────────────────────────
SUPABASE_URL = "https://nhfhvxcmfgunhfdxhcyf.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZmh2eGNtZmd1bmhmZHhoY3lmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDcxMzg0MywiZXhwIjoyMDkwMjg5ODQzfQ.2qRLGDb39adJnLU4Grzj0kpgg5aj99mbujTdmkrUGqc"

BASE_DIR = "/Users/hannahrichardson/Desktop/Montessori albums/Residency Albums"

# ─── Level IDs ──────────────────────────────────────────────────────
LEVELS = {
    "Primary": "5bfc6bba-9f76-4da8-8f4e-4679b016cdc2",
    "Elementary": "1553206b-f7fe-48fe-b27e-fb0d8883bab4",
}

# ─── Strand IDs (folder name → strand_id, per level) ───────────────
STRANDS = {
    ("Primary", "Practical Life"): "4dcd16f6-ff1c-42f8-8e89-78d7dc3fbcb6",
    ("Primary", "Mathematics"): "06853b9d-6ad6-4369-863a-b70bf076c166",
    ("Primary", "Language"): "15bf9d51-27f9-482a-9941-fb3e522931dd",
    ("Primary", "Sensorial"): "72d84aa1-8c82-440a-90ec-8d22e1c43415",
    ("Primary", "Theory"): "dc2fcdd8-05a2-4f5b-88e4-e6f0a9c78528",
    ("Elementary", "Art"): "a1f5e116-8689-4116-a4d6-1daebf390f93",
    ("Elementary", "Biology"): "daa8fede-e172-45c1-8685-366e2b3e38be",
    ("Elementary", "Geography"): "e8294576-f290-4ea9-902e-eadaa8a62a6a",
    ("Elementary", "Geometry"): "3bb03d4a-7843-49cb-9b1a-f9ff661169d5",
    ("Elementary", "History"): "97f94f00-b979-4777-b6aa-1b0c52e7f808",
    ("Elementary", "Language"): "7499189e-0a31-440c-9c72-84fc7261d7a6",
    ("Elementary", "Mathematics"): "e72d0c45-845d-4c92-b387-caf4a899f0d0",
    ("Elementary", "Music"): "6822f34c-f33d-436b-a32c-2cb261dae27a",
    ("Elementary", "Theory"): "cc3e24ce-bbdb-4b54-82ad-7e4f613ce47f",
}

# ─── Category lookup (will be loaded from DB) ──────────────────────
CATEGORIES = {}  # name_lower → {id, strand_id}


def load_categories():
    """Load all categories from DB for matching."""
    url = f"{SUPABASE_URL}/rest/v1/residency_categories?select=id,name,strand_id"
    req = urllib.request.Request(url, headers={
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
    })
    with urllib.request.urlopen(req) as resp:
        cats = json.loads(resp.read())
    for c in cats:
        key = (c["name"].lower(), c["strand_id"])
        CATEGORIES[key] = c["id"]
    print(f"Loaded {len(CATEGORIES)} categories from DB")


def supabase_insert(table, record):
    """Insert a record via Supabase REST API."""
    url = f"{SUPABASE_URL}/rest/v1/{table}"
    data = json.dumps(record).encode("utf-8")
    req = urllib.request.Request(url, data=data, method="POST", headers={
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    })
    try:
        urllib.request.urlopen(req)
        return True
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"  ERROR inserting: {body[:200]}")
        return False


def slugify(text):
    """Create URL-friendly slug from text."""
    s = text.lower().strip()
    s = re.sub(r'[^\w\s-]', '', s)
    s = re.sub(r'[\s_]+', '-', s)
    s = re.sub(r'-+', '-', s)
    return s[:80].strip('-')


def extract_lesson_number(filename):
    """Extract lesson number from filename like MMR_..._Lesson01_..."""
    m = re.search(r'Lesson(\d+)', filename)
    return int(m.group(1)) if m else 0


def parse_docx(filepath):
    """Parse a lesson docx into structured fields."""
    doc = Document(filepath)
    paragraphs = [(p.style.name if p.style else "None", p.text.strip()) for p in doc.paragraphs]

    # Extract header info (first ~10 non-empty paragraphs)
    header_lines = []
    for style, text in paragraphs:
        if text and style not in ("Heading 1", "Heading 2", "Heading 3"):
            header_lines.append(text)
            if len(header_lines) >= 10:
                break
        elif style.startswith("Heading"):
            break

    # Parse title from header (usually line index 5 or the line after "Lesson N")
    title = ""
    category_hint = ""
    age_range = ""
    for i, line in enumerate(header_lines):
        if re.match(r'^Strand\b', line, re.I):
            category_hint = re.sub(r'^Strand\s+\w+:\s*', '', line).strip()
        elif re.match(r'^Lesson\s+\d+', line):
            # Next line is the title
            if i + 1 < len(header_lines):
                title = header_lines[i + 1]
        elif re.match(r'^\d+[–-]\d+', line) or 'Environment' in line:
            age_range = line

    if not title and len(header_lines) >= 6:
        title = header_lines[5] if len(header_lines) > 5 else header_lines[-1]

    # Parse sections by heading level
    sections = {}
    current_h1 = ""
    current_h2 = ""
    current_h3 = ""

    for style, text in paragraphs:
        if not text:
            continue
        if style == "Heading 1":
            current_h1 = text
            current_h2 = ""
            current_h3 = ""
            if current_h1 not in sections:
                sections[current_h1] = {"_text": [], "_subs": {}}
        elif style == "Heading 2":
            current_h2 = text
            current_h3 = ""
            if current_h1 and current_h2 not in sections.get(current_h1, {}).get("_subs", {}):
                sections.setdefault(current_h1, {"_text": [], "_subs": {}})["_subs"][current_h2] = {"_text": [], "_subs": {}}
        elif style == "Heading 3":
            current_h3 = text
            if current_h1:
                sections.setdefault(current_h1, {"_text": [], "_subs": {}})
                if current_h2:
                    sections[current_h1]["_subs"].setdefault(current_h2, {"_text": [], "_subs": {}})["_subs"][current_h3] = []
                else:
                    sections[current_h1]["_subs"][current_h3] = {"_text": [], "_subs": {}}
        elif current_h1:
            # Body text — append to deepest current section
            if current_h3 and current_h2:
                target = sections.get(current_h1, {}).get("_subs", {}).get(current_h2, {}).get("_subs", {}).get(current_h3)
                if isinstance(target, list):
                    target.append(text)
                elif isinstance(target, dict):
                    target.setdefault("_text", []).append(text)
            elif current_h3:
                target = sections.get(current_h1, {}).get("_subs", {}).get(current_h3, {})
                if isinstance(target, dict):
                    target.setdefault("_text", []).append(text)
            elif current_h2:
                sections.get(current_h1, {}).get("_subs", {}).get(current_h2, {}).get("_text", []).append(text)
            else:
                sections.get(current_h1, {}).get("_text", []).append(text)

    def get_section_text(name):
        s = sections.get(name, {})
        parts = s.get("_text", []) if isinstance(s, dict) else []
        # Also include sub-section text
        if isinstance(s, dict):
            for sub_name, sub in s.get("_subs", {}).items():
                if isinstance(sub, dict):
                    sub_text = sub.get("_text", [])
                    if sub_text:
                        parts.append(f"**{sub_name}**")
                        parts.extend(sub_text)
                elif isinstance(sub, list) and sub:
                    parts.append(f"**{sub_name}**")
                    parts.extend(sub)
        return "\n\n".join(parts) if parts else None

    def get_sub_text(h1, h2):
        s = sections.get(h1, {}).get("_subs", {}).get(h2, {})
        if isinstance(s, dict):
            return "\n\n".join(s.get("_text", [])) or None
        return None

    # Extract specific fields
    why_matters = get_section_text("Why This Lesson Matters")
    direct_aim = get_sub_text("Purpose", "Direct Aims")
    indirect_aim = get_sub_text("Purpose", "Indirect Aims")
    equity_aim = get_sub_text("Purpose", "The Equity Aim")
    materials_text = get_section_text("Materials")
    presentation = get_section_text("The Presentation")
    points_of_interest = get_section_text("Points of Interest")
    variations = get_section_text("Variations and Extensions")
    neurodivergence = get_section_text("Neurodivergence, Sensory Profiles, and Behavior")

    # Build full content from all sections
    all_content_parts = []
    for sec_name, sec_data in sections.items():
        all_content_parts.append(f"## {sec_name}")
        if isinstance(sec_data, dict):
            for t in sec_data.get("_text", []):
                all_content_parts.append(t)
            for sub_name, sub_data in sec_data.get("_subs", {}).items():
                all_content_parts.append(f"### {sub_name}")
                if isinstance(sub_data, dict):
                    for t in sub_data.get("_text", []):
                        all_content_parts.append(t)
                    for sub3_name, sub3_data in sub_data.get("_subs", {}).items():
                        all_content_parts.append(f"#### {sub3_name}")
                        if isinstance(sub3_data, list):
                            all_content_parts.extend(sub3_data)
                        elif isinstance(sub3_data, dict):
                            all_content_parts.extend(sub3_data.get("_text", []))
                elif isinstance(sub_data, list):
                    all_content_parts.extend(sub_data)

    content = "\n\n".join(all_content_parts)

    # Extract materials as list
    materials_list = []
    mat_section = sections.get("Materials", {})
    if isinstance(mat_section, dict):
        for sub_name in mat_section.get("_subs", {}):
            materials_list.append(sub_name)

    return {
        "title": title,
        "category_hint": category_hint,
        "age_range": age_range,
        "why_this_lesson_matters": why_matters,
        "direct_aim": direct_aim,
        "indirect_aim": indirect_aim,
        "equity_aim": equity_aim,
        "presentation": presentation,
        "points_of_interest": points_of_interest,
        "variations": variations,
        "neurodivergence_notes": neurodivergence,
        "content": content,
        "materials": materials_list,
        "description": (why_matters or "")[:500] if why_matters else None,
    }


def find_category_id(category_hint, strand_id):
    """Try to match category hint to a DB category."""
    if not category_hint:
        return None
    hint_lower = category_hint.lower().strip()
    # Direct match
    if (hint_lower, strand_id) in CATEGORIES:
        return CATEGORIES[(hint_lower, strand_id)]
    # Fuzzy match
    for (name_lower, sid), cid in CATEGORIES.items():
        if sid == strand_id and (hint_lower in name_lower or name_lower in hint_lower):
            return cid
    return None


def main():
    load_categories()

    total = 0
    success = 0
    errors = []

    for level_name in ["Primary", "Elementary"]:
        level_id = LEVELS[level_name]
        level_dir = os.path.join(BASE_DIR, level_name)
        if not os.path.isdir(level_dir):
            continue

        for strand_name in sorted(os.listdir(level_dir)):
            strand_dir = os.path.join(level_dir, strand_name)
            if not os.path.isdir(strand_dir):
                continue

            strand_key = (level_name, strand_name)
            strand_id = STRANDS.get(strand_key)
            if not strand_id:
                print(f"WARNING: No strand mapping for {strand_key}")
                continue

            files = sorted([f for f in os.listdir(strand_dir) if f.endswith('.docx') and not f.startswith('~')])
            print(f"\n{level_name}/{strand_name}: {len(files)} lessons")

            for fname in files:
                total += 1
                filepath = os.path.join(strand_dir, fname)
                lesson_num = extract_lesson_number(fname)

                try:
                    parsed = parse_docx(filepath)
                except Exception as e:
                    print(f"  PARSE ERROR {fname}: {e}")
                    errors.append(fname)
                    continue

                title = parsed["title"] or fname.replace('.docx', '').replace('_', ' ')
                slug = slugify(f"{level_name}-{strand_name}-{lesson_num:02d}-{title}")

                category_id = find_category_id(parsed["category_hint"], strand_id)

                record = {
                    "title": title[:255],
                    "slug": slug,
                    "description": parsed["description"],
                    "content": parsed["content"],
                    "strand_id": strand_id,
                    "level_id": level_id,
                    "category_id": category_id,
                    "status": "published",
                    "sort_order": lesson_num,
                    "age_range": parsed["age_range"][:100] if parsed["age_range"] else None,
                    "why_this_lesson_matters": parsed["why_this_lesson_matters"],
                    "direct_aim": parsed["direct_aim"],
                    "indirect_aim": parsed["indirect_aim"],
                    "equity_aim": parsed["equity_aim"],
                    "presentation": parsed["presentation"],
                    "points_of_interest": parsed["points_of_interest"],
                    "variations": parsed["variations"],
                    "neurodivergence_notes": parsed["neurodivergence_notes"],
                    "materials": parsed["materials"] if parsed["materials"] else None,
                }

                ok = supabase_insert("residency_lessons", record)
                if ok:
                    success += 1
                    print(f"  [{success}/{total}] {title[:60]}")
                else:
                    errors.append(fname)

    print(f"\n{'='*60}")
    print(f"Done! {success}/{total} lessons imported successfully.")
    if errors:
        print(f"{len(errors)} errors:")
        for e in errors:
            print(f"  - {e}")


if __name__ == "__main__":
    main()
