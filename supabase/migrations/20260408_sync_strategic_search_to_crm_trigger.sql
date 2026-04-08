-- ─────────────────────────────────────────────────────────────────────────────
-- Trigger: when a role is created/updated on Strategic Search,
-- automatically create or update the corresponding crm_searches record.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION sync_strategic_to_crm()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_school_name  text;
  v_existing_id  uuid;
BEGIN
  -- Fetch school name from parent searches row
  SELECT school_name INTO v_school_name
    FROM searches
   WHERE id = NEW.search_id;

  -- Find any existing crm_searches record tied to this role
  SELECT id INTO v_existing_id
    FROM crm_searches
   WHERE source_role_id = NEW.id;

  IF TG_OP = 'INSERT' THEN
    -- Only auto-create CRM search for active roles
    IF NEW.active THEN
      INSERT INTO crm_searches (
        school_name,
        position_title,
        position_description,
        status,
        source_role_id
      ) VALUES (
        v_school_name,
        NEW.title,
        NEW.description,
        'active',
        NEW.id
      )
      ON CONFLICT DO NOTHING;
    END IF;

  ELSIF TG_OP = 'UPDATE' THEN
    IF v_existing_id IS NOT NULL THEN
      -- Sync changes back to existing CRM search
      UPDATE crm_searches SET
        school_name        = v_school_name,
        position_title     = NEW.title,
        position_description = NEW.description,
        status             = CASE WHEN NEW.active THEN 'active' ELSE 'closed' END
      WHERE id = v_existing_id;

    ELSIF NEW.active THEN
      -- Role was just activated for the first time — create the CRM entry
      INSERT INTO crm_searches (
        school_name,
        position_title,
        position_description,
        status,
        source_role_id
      ) VALUES (
        v_school_name,
        NEW.title,
        NEW.description,
        'active',
        NEW.id
      )
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Drop and recreate trigger to avoid duplicate
DROP TRIGGER IF EXISTS trg_sync_strategic_to_crm ON search_roles;

CREATE TRIGGER trg_sync_strategic_to_crm
  AFTER INSERT OR UPDATE ON search_roles
  FOR EACH ROW
  EXECUTE FUNCTION sync_strategic_to_crm();


-- ─────────────────────────────────────────────────────────────────────────────
-- Also close CRM searches when the parent search (school) is deactivated
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION sync_search_active_to_crm()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  -- If school search is deactivated, close all linked CRM searches
  IF OLD.active = true AND NEW.active = false THEN
    UPDATE crm_searches cs
       SET status = 'closed'
      FROM search_roles sr
     WHERE sr.search_id = NEW.id
       AND cs.source_role_id = sr.id
       AND cs.status = 'active';
  END IF;

  -- If school search is re-activated, re-open CRM searches whose roles are active
  IF OLD.active = false AND NEW.active = true THEN
    UPDATE crm_searches cs
       SET status = 'active'
      FROM search_roles sr
     WHERE sr.search_id = NEW.id
       AND cs.source_role_id = sr.id
       AND sr.active = true
       AND cs.status = 'closed';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_search_active_to_crm ON searches;

CREATE TRIGGER trg_sync_search_active_to_crm
  AFTER UPDATE OF active ON searches
  FOR EACH ROW
  EXECUTE FUNCTION sync_search_active_to_crm();


-- ─────────────────────────────────────────────────────────────────────────────
-- Backfill: create crm_searches for all existing active search_roles
-- that don't already have a linked CRM search
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO crm_searches (
  school_name,
  position_title,
  position_description,
  status,
  source_role_id
)
SELECT
  s.school_name,
  sr.title,
  sr.description,
  'active',
  sr.id
FROM search_roles sr
JOIN searches s ON s.id = sr.search_id
WHERE sr.active   = true
  AND s.active    = true
  AND NOT EXISTS (
    SELECT 1 FROM crm_searches cs WHERE cs.source_role_id = sr.id
  );
