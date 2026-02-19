-- LeadBaas.nl - Supabase Schema
-- Simple CRM for Dutch MKB/ZZP

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users (extends Supabase auth)
CREATE TABLE IF NOT EXISTS lb_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  plan TEXT NOT NULL DEFAULT 'gratis', -- gratis, solo, team
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Companies (klanten / relaties)
CREATE TABLE IF NOT EXISTS lb_companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  website TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  kvk_number TEXT,
  industry TEXT,
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contacts (personen bij bedrijven)
CREATE TABLE IF NOT EXISTS lb_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES lb_companies(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  role TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deals (leads / kansen)
CREATE TABLE IF NOT EXISTS lb_deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES lb_companies(id) ON DELETE SET NULL,
  contact_id UUID REFERENCES lb_contacts(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  value DECIMAL DEFAULT 0,
  stage TEXT NOT NULL DEFAULT 'prospect', -- prospect, contact, offerte, onderhandeling, gewonnen, verloren
  expected_close_date DATE,
  probability INTEGER DEFAULT 50, -- 0-100%
  notes TEXT,
  source TEXT, -- website, referral, cold, linkedin, etc.
  lost_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activities (notities, calls, emails, meetings)
CREATE TABLE IF NOT EXISTS lb_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES lb_deals(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES lb_contacts(id) ON DELETE SET NULL,
  company_id UUID REFERENCES lb_companies(id) ON DELETE SET NULL,
  type TEXT NOT NULL, -- note, call, email, meeting, whatsapp, task
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE lb_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lb_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE lb_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE lb_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE lb_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Own profile" ON lb_profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Own companies" ON lb_companies FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own contacts" ON lb_contacts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own deals" ON lb_deals FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own activities" ON lb_activities FOR ALL USING (auth.uid() = user_id);

-- Trigger: auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO lb_profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_lb_profiles_updated_at BEFORE UPDATE ON lb_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_lb_companies_updated_at BEFORE UPDATE ON lb_companies FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_lb_contacts_updated_at BEFORE UPDATE ON lb_contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_lb_deals_updated_at BEFORE UPDATE ON lb_deals FOR EACH ROW EXECUTE FUNCTION update_updated_at();
