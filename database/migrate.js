import { neon } from '@neondatabase/serverless';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fungsi untuk migrate data dari JSON ke Neon
async function migrateJsonToNeon() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL tidak ditemukan di environment variables');
    console.log('💡 Pastikan sudah setup Neon database di Vercel dan copy DATABASE_URL ke .env');
    process.exit(1);
  }

  console.log('🚀 Memulai migrasi data...\n');

  const sql = neon(databaseUrl);

  try {
    // 1. Create tables manually
    console.log('📋 Membuat tabel database...');
    
    // Create news table
    await sql`
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
      )
    `;
    
    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_news_category ON news(category)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_news_trending ON news(trending)`;
    
    // Create settings table
    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY DEFAULT 1,
        breaking_text TEXT,
        trending JSONB DEFAULT '[]'::jsonb,
        sources JSONB DEFAULT '[]'::jsonb,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    
    // Insert default settings
    await sql`
      INSERT INTO settings (id, breaking_text, trending, sources)
      VALUES (1, '', '[]'::jsonb, '[]'::jsonb)
      ON CONFLICT (id) DO NOTHING
    `;
    
    console.log('✅ Tabel berhasil dibuat\n');

    // 2. Load data dari cms.json
    console.log('📦 Membaca data dari cms.json...');
    const dataPath = path.join(__dirname, '..', 'data', 'cms.json');
    const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    console.log(`✅ Ditemukan ${jsonData.news?.length || 0} berita\n`);

    // 3. Migrate news
    if (jsonData.news && jsonData.news.length > 0) {
      console.log('📝 Migrasi data berita...');
      for (const item of jsonData.news) {
        await sql`
          INSERT INTO news (
            id, title, summary, full_content, category, image, 
            author, author_avatar, trending, cat_color, created_at
          ) VALUES (
            ${item.id}, ${item.title}, ${item.summary}, ${item.fullContent},
            ${item.category}, ${item.image}, ${item.author}, ${item.authorAvatar},
            ${item.trending}, ${item.catColor}, ${item.createdAt}
          )
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            summary = EXCLUDED.summary,
            full_content = EXCLUDED.full_content,
            category = EXCLUDED.category,
            image = EXCLUDED.image,
            author = EXCLUDED.author,
            author_avatar = EXCLUDED.author_avatar,
            trending = EXCLUDED.trending,
            cat_color = EXCLUDED.cat_color,
            created_at = EXCLUDED.created_at
        `;
      }
      console.log(`✅ ${jsonData.news.length} berita berhasil dimigrasikan\n`);
    }

    // 4. Migrate settings
    console.log('⚙️  Migrasi settings...');
    await sql`
      INSERT INTO settings (id, breaking_text, trending, sources)
      VALUES (
        1, 
        ${jsonData.breakingText || ''}, 
        ${JSON.stringify(jsonData.trending || [])}, 
        ${JSON.stringify(jsonData.sources || [])}
      )
      ON CONFLICT (id) DO UPDATE SET
        breaking_text = EXCLUDED.breaking_text,
        trending = EXCLUDED.trending,
        sources = EXCLUDED.sources
    `;
    console.log('✅ Settings berhasil dimigrasikan\n');

    console.log('🎉 Migrasi selesai! Database siap digunakan.\n');
    console.log('💡 Sekarang Anda bisa deploy ke Vercel.');
    
  } catch (error) {
    console.error('❌ Error saat migrasi:', error);
    process.exit(1);
  }
}

// Jalankan migrasi
migrateJsonToNeon();
