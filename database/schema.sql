-- Migration script untuk Neon Postgres
-- Jalankan script ini setelah setup Neon database di Vercel

-- Table: news
CREATE TABLE IF NOT EXISTS news (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  full_content TEXT,
  category VARCHAR(100),
  image TEXT,
  author VARCHAR(255),
  author_avatar TEXT,
  trending BOOLEAN DEFAULT false,
  cat_color VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk performa query
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_trending ON news(trending);

-- Table: settings (untuk breaking news, trending, sources)
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  breaking_text TEXT,
  trending JSONB DEFAULT '[]'::jsonb,
  sources JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (id, breaking_text, trending, sources)
VALUES (1, '', '[]'::jsonb, '[]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Trigger untuk update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Selesai!
-- Setelah menjalankan script ini, database siap digunakan.
