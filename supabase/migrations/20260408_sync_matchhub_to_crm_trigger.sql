CREATE OR REPLACE FUNCTION sync_matchhub_to_crm()
RETURNS TRIGGER AS $$
DECLARE
  v_existing_id uuid;
  v_location_parts text[];
  v_city text;
  v_state text;
  v_crm_levels text[];
  v_level text;
  v_mapped text;
  v_full_name text;
BEGIN
  -- Build full name from first_name + last_initial
  v_full_name := NEW.first_name ||
    CASE WHEN NEW.last_initial IS NOT NULL AND NEW.last_initial != ''
         THEN ' ' || NEW.last_initial || '.'
         ELSE ''
    END;

  -- Parse "City, State" → separate city + state
  IF NEW.location IS NOT NULL AND NEW.location != '' THEN
    v_location_parts := string_to_array(NEW.location, ',');
    v_city := trim(v_location_parts[1]);
    IF array_length(v_location_parts, 1) >= 2 THEN
      v_state := trim(v_location_parts[2]);
    END IF;
  END IF;

  -- Map MatchHub level labels → CRM level labels (LIKE handles the en-dash suffix)
  v_crm_levels := ARRAY[]::text[];
  IF NEW.levels IS NOT NULL THEN
    FOREACH v_level IN ARRAY NEW.levels LOOP
      v_mapped := CASE
        WHEN v_level LIKE 'Infant/Toddler%'    THEN 'Infant/Toddler'
        WHEN v_level LIKE 'Primary%'            THEN 'Primary'
        WHEN v_level LIKE 'Lower Elementary%'   THEN 'Lower Elementary'
        WHEN v_level LIKE 'Upper Elementary%'   THEN 'Upper Elementary'
        WHEN v_level LIKE 'Adolescent%'         THEN 'Middle School'
        ELSE NULL
      END;
      IF v_mapped IS NOT NULL THEN
        v_crm_levels := array_append(v_crm_levels, v_mapped);
      END IF;
    END LOOP;
  END IF;

  IF NEW.open_to_placement = true THEN
    -- Check for existing CRM candidate by email
    SELECT id INTO v_existing_id
    FROM crm_candidates
    WHERE email = NEW.email
    LIMIT 1;

    IF v_existing_id IS NOT NULL THEN
      -- Update existing record
      UPDATE crm_candidates SET
        actively_looking      = true,
        source                = 'MatchHub',
        matchhub_profile_url  = 'https://montessorimakersgroup.org/matchhub/talent',
        matchhub_synced_at    = now()
      WHERE id = v_existing_id;
    ELSE
      -- Insert new CRM candidate from MatchHub profile
      INSERT INTO crm_candidates (
        full_name,
        email,
        location_city,
        location_state,
        credential,
        levels_certified,
        years_experience,
        actively_looking,
        source,
        notes,
        matchhub_profile_url,
        matchhub_synced_at
      ) VALUES (
        v_full_name,
        NEW.email,
        v_city,
        v_state,
        CASE NEW.credential WHEN 'Other' THEN 'None' ELSE NEW.credential END,
        CASE WHEN array_length(v_crm_levels, 1) > 0 THEN v_crm_levels ELSE NULL END,
        NEW.years_experience,
        true,
        'MatchHub',
        NEW.summary,
        'https://montessorimakersgroup.org/matchhub/talent',
        now()
      );
    END IF;

  ELSE
    -- open_to_placement = false: deactivate any existing MatchHub-sourced record
    UPDATE crm_candidates SET
      actively_looking   = false,
      matchhub_synced_at = now()
    WHERE email = NEW.email
      AND source = 'MatchHub';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_sync_matchhub_to_crm ON guide_profiles;

CREATE TRIGGER trg_sync_matchhub_to_crm
  AFTER INSERT OR UPDATE ON guide_profiles
  FOR EACH ROW EXECUTE FUNCTION sync_matchhub_to_crm();
