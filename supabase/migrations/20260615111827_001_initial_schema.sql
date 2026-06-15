-- Listings table for vehicles and machinery
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Cars', 'Trucks', 'Tractors', 'Excavators', 'Heavy Machinery', 'Equipment')),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price BIGINT NOT NULL,
  mileage INTEGER,
  hours_used INTEGER,
  transmission TEXT NOT NULL DEFAULT 'Automatic',
  fuel_type TEXT NOT NULL DEFAULT 'Diesel',
  drive_system TEXT NOT NULL DEFAULT '4WD',
  condition TEXT NOT NULL DEFAULT 'Used' CHECK (condition IN ('New', 'Used')),
  color TEXT NOT NULL,
  description TEXT NOT NULL,
  specifications JSONB DEFAULT '{}',
  features JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enquiries table for customer contacts
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  listing_name TEXT,
  status TEXT NOT NULL DEFAULT 'Unread' CHECK (status IN ('Unread', 'Read', 'Followed Up', 'Resolved')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Business settings table (single row for site configuration)
CREATE TABLE business_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'DX STAR EMPORIUM',
  tagline TEXT NOT NULL DEFAULT 'Quality Vehicles and Equipment',
  phone TEXT NOT NULL DEFAULT '+234 803 456 7890',
  whatsapp TEXT NOT NULL DEFAULT '2348034567890',
  email TEXT NOT NULL DEFAULT 'info@dxstaremporium.com',
  address TEXT NOT NULL DEFAULT '15 Adeniran Ogunsanya Street, Surulere, Lagos, Nigeria',
  business_hours JSONB DEFAULT '[
    {"day": "Monday", "open": "9:00 AM", "close": "6:00 PM", "closed": false},
    {"day": "Tuesday", "open": "9:00 AM", "close": "6:00 PM", "closed": false},
    {"day": "Wednesday", "open": "9:00 AM", "close": "6:00 PM", "closed": false},
    {"day": "Thursday", "open": "9:00 AM", "close": "6:00 PM", "closed": false},
    {"day": "Friday", "open": "9:00 AM", "close": "6:00 PM", "closed": false},
    {"day": "Saturday", "open": "10:00 AM", "close": "4:00 PM", "closed": false},
    {"day": "Sunday", "open": "N/A", "close": "N/A", "closed": true}
  ]',
  social_media JSONB DEFAULT '[
    {"platform": "Facebook", "url": "https://facebook.com/dxstaremporium"},
    {"platform": "Instagram", "url": "https://instagram.com/dxstaremporium"},
    {"platform": "LinkedIn", "url": "https://linkedin.com/company/dxstaremporium"}
  ]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Admin users table for authentication
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default business settings
INSERT INTO business_settings (name, tagline, phone, whatsapp, email, address)
VALUES (
  'DX STAR EMPORIUM',
  'Quality Vehicles and Equipment',
  '+234 803 456 7890',
  '2348034567890',
  'info@dxstaremporium.com',
  '15 Adeniran Ogunsanya Street, Surulere, Lagos, Nigeria'
);

-- Enable RLS
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Listings policies (public read, admin write)
CREATE POLICY "listings_public_read" ON listings FOR SELECT
  TO public USING (published = true);

CREATE POLICY "listings_admin_all" ON listings FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- Enquiries policies (public insert, admin all)
CREATE POLICY "enquiries_public_insert" ON enquiries FOR INSERT
  TO public WITH CHECK (true);

CREATE POLICY "enquiries_admin_all" ON enquiries FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- Business settings policies (public read, admin all)
CREATE POLICY "business_settings_public_read" ON business_settings FOR SELECT
  TO public USING (true);

CREATE POLICY "business_settings_admin_all" ON business_settings FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- Admin users policies (admin only)
CREATE POLICY "admin_users_admin_all" ON admin_users FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_listings_category ON listings(category);
CREATE INDEX idx_listings_brand ON listings(brand);
CREATE INDEX idx_listings_published ON listings(published);
CREATE INDEX idx_listings_featured ON listings(featured);
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_created ON enquiries(created_at DESC);
