-- Create storage bucket for listing images
INSERT INTO storage.buckets (id, name, public)
VALUES ('listing-images', 'listing-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow public read of images
CREATE POLICY "storage_public_read" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'listing-images');

-- Policy to allow authenticated upload
CREATE POLICY "storage_auth_upload" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'listing-images');

-- Policy to allow authenticated delete
CREATE POLICY "storage_auth_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'listing-images');

-- Function to generate unique slug
CREATE OR REPLACE FUNCTION generate_unique_slug(base_slug TEXT, table_name TEXT DEFAULT 'listings')
RETURNS TEXT AS $$
DECLARE
  final_slug TEXT := base_slug;
  counter INTEGER := 1;
  slug_exists BOOLEAN;
BEGIN
  -- Check if slug exists
  EXECUTE format('SELECT EXISTS(SELECT 1 FROM %I WHERE slug = $1)', table_name)
  USING final_slug INTO slug_exists;
  
  -- Keep appending counter until unique
  WHILE slug_exists LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
    
    EXECUTE format('SELECT EXISTS(SELECT 1 FROM %I WHERE slug = $1)', table_name)
    USING final_slug INTO slug_exists;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate slug on insert
CREATE OR REPLACE FUNCTION auto_generate_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_unique_slug(
      lower(regexp_replace(NEW.name, '[^a-zA-Z0-9]+', '-', 'g'))::TEXT
    );
  ELSE
    -- Ensure provided slug is unique
    NEW.slug := generate_unique_slug(NEW.slug);
  END IF;
  
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if any
DROP TRIGGER IF EXISTS listings_slug_trigger ON listings;

-- Create trigger
CREATE TRIGGER listings_slug_trigger
  BEFORE INSERT OR UPDATE ON listings
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_slug();

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS listings_updated_at ON listings;
CREATE TRIGGER listings_updated_at
  BEFORE UPDATE ON listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS enquiries_updated_at ON enquiries;
CREATE TRIGGER enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
