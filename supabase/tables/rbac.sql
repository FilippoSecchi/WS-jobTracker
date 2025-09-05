-- Estensione per UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Tabella profili utente (estende auth.users)
CREATE TABLE IF NOT EXISTS  user_profiles (
  id UUID  PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  is_active BOOLEAN DEFAULT false,
  email TEXT NOT NULL,
  email_verified BOOLEAN DEFAULT false,
  phone TEXT,
  phone_verified BOOLEAN DEFAULT false,
  wa_active BOOLEAN DEFAULT false,
  wa_same_as_phone BOOLEAN DEFAULT true,
  wa_number TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inizio tabelle RBAC

-- Tabella ruoli dell'applicazione
CREATE TABLE IF NOT EXISTS  app_roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL, -- es: 'admin', 'manager', 'worker'
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabella risorse dell'applicazione
CREATE TABLE IF NOT EXISTS  app_resources (
  id bigint generated always as identity PRIMARY KEY,
  name TEXT UNIQUE NOT NULL, -- es: 'clients', 'services', 'teams'
  description TEXT,
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabella azioni dell'applicazione
CREATE TABLE IF NOT EXISTS  app_actions (
  id bigint generated always as identity PRIMARY KEY,
  name TEXT UNIQUE NOT NULL, -- es: 'create', 'read', 'update', 'delete'
  description TEXT,
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabella scopes dell'applicazione
CREATE TABLE IF NOT EXISTS  app_scopes (
  id bigint generated always as identity PRIMARY KEY,
  name TEXT UNIQUE NOT NULL, -- es: 'own', 'team', 'all'
  description TEXT, 
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabella permessi per ruolo
CREATE TABLE IF NOT EXISTS  role_access (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  role_id UUID REFERENCES app_roles(id) ON DELETE CASCADE,
  resource_id bigint REFERENCES app_resources(id) ON DELETE CASCADE,
  action_id bigint REFERENCES app_actions(id) ON DELETE CASCADE,
  scope_id bigint REFERENCES app_scopes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(role_id, resource_id, action_id, scope_id)
);

-- Tabella associazione utente-ruolo
CREATE TABLE IF NOT EXISTS  user_roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  role_id UUID REFERENCES app_roles(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES user_profiles(id),
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  UNIQUE(user_id, role_id)
);

-- Fine tabelle RBAC

-- Tabella dettagli worker
CREATE TABLE worker_details (
  id UUID PRIMARY KEY REFERENCES user_profiles(id) ON DELETE CASCADE,
  cod_fisc TEXT UNIQUE,
  sex TEXT,
  dob DATE,
  born_country_id BIGINT,
  born_region_id BIGINT,
  born_province_id BIGINT,
  born_city TEXT,
  born_postal_code TEXT,
  eu_citizen BOOLEAN DEFAULT true
  res_country_id BIGINT,
  res_region_id BIGINT,
  res_province_id BIGINT,
  res_city TEXT,
  res_street TEXT,
  res_street_number TEXT,
  res_postal_code TEXT, 
  dom_same_as_res BOOLEAN DEFAULT true,
  dom_country_id BIGINT,
  dom_region_id BIGINT,
  dom_province_id BIGINT,
  dom_city TEXT,
  dom_street TEXT,
  dom_street_number TEXT,
  dom_postal_code TEXT, 
  driving_license BOOLEAN DEFAULT false,
  vehicle_ownership BOOLEAN DEFAULT false,
  vehicle_type TEXT,
  vehicle_plate TEXT,
  vehicle_insurance BOOLEAN DEFAULT false,
  vehicle_insurance_exp DATE,
  vehical_seat_count INT,
  vehicle_cargo_capacity DECIMAL(10,2),
  transfer_availability BOOLEAN DEFAULT false,
  overnight_availability BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Configurazioni utente
CREATE TABLE user_configurations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  config_key TEXT NOT NULL,
  config_value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, config_key)
);

-- Profili clienti aziendali
CREATE TABLE client_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name TEXT NOT NULL,
  vat_number TEXT UNIQUE,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'IT',
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sedi clienti
CREATE TABLE client_locations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES client_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT,
  contact_person TEXT,
  contact_phone TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tariffe clienti
CREATE TABLE client_fees (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES client_profiles(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  hourly_rate DECIMAL(10,2),
  fixed_rate DECIMAL(10,2),
  currency TEXT DEFAULT 'EUR',
  valid_from DATE NOT NULL,
  valid_to DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Servizi
CREATE TABLE services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  default_rate DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);