import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { sql, isDev } from '../../lib/db';

const DATA_FILE = path.resolve('data/cms.json');

// === DEVELOPMENT MODE: JSON File Functions ===
function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { news: [], trending: [], sources: [], breakingText: '' };
  }
}

function writeData(data: any) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// === PRODUCTION MODE: Neon Postgres Functions ===
async function readDataFromDB() {
  if (!sql) {
    throw new Error('Database not configured');
  }

  try {
    const newsResult = await sql`SELECT * FROM news ORDER BY created_at DESC`;
    const settingsResult = await sql`SELECT * FROM settings WHERE id = 1`;
    
    const settings = settingsResult[0] || { breaking_text: '', trending: [], sources: [] };
    
    return {
      news: newsResult.map((row: any) => ({
        id: row.id,
        title: row.title,
        summary: row.summary,
        fullContent: row.full_content,
        category: row.category,
        image: row.image,
        author: row.author,
        authorAvatar: row.author_avatar,
        trending: row.trending,
        catColor: row.cat_color,
        createdAt: row.created_at,
      })),
      breakingText: settings.breaking_text || '',
      trending: settings.trending || [],
      sources: settings.sources || [],
    };
  } catch (error) {
    console.error('Error reading from database:', error);
    throw error;
  }
}

async function writeDataToDB(data: any) {
  if (!sql) {
    throw new Error('Database not configured');
  }

  try {
    // Update news if provided
    if (data.news) {
      // Delete all existing news
      await sql`DELETE FROM news`;
      
      // Insert new news
      for (const item of data.news) {
        await sql`
          INSERT INTO news (
            id, title, summary, full_content, category, image, 
            author, author_avatar, trending, cat_color, created_at
          ) VALUES (
            ${item.id}, ${item.title}, ${item.summary}, ${item.fullContent},
            ${item.category}, ${item.image}, ${item.author}, ${item.authorAvatar},
            ${item.trending}, ${item.catColor}, ${item.createdAt}
          )
        `;
      }
    }

    // Update settings
    const breakingText = data.breakingText !== undefined ? data.breakingText : '';
    const trending = data.trending || [];
    const sources = data.sources || [];

    await sql`
      INSERT INTO settings (id, breaking_text, trending, sources)
      VALUES (1, ${breakingText}, ${JSON.stringify(trending)}, ${JSON.stringify(sources)})
      ON CONFLICT (id) DO UPDATE SET
        breaking_text = EXCLUDED.breaking_text,
        trending = EXCLUDED.trending,
        sources = EXCLUDED.sources
    `;
  } catch (error) {
    console.error('Error writing to database:', error);
    throw error;
  }
}

// === API ROUTES ===
export const GET: APIRoute = async () => {
  try {
    let data;
    
    if (isDev) {
      // DEVELOPMENT: Read from JSON file
      data = readData();
      console.log('✅ [DEV] Data loaded from JSON file');
    } else {
      // PRODUCTION: Read from Neon database
      data = await readDataFromDB();
      console.log('✅ [PROD] Data loaded from Neon database');
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error: any) {
    console.error('GET error:', error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    if (isDev) {
      // DEVELOPMENT: Write to JSON file
      const current = readData();
      const updated = {
        news: body.news ?? current.news,
        trending: body.trending ?? current.trending,
        sources: body.sources ?? current.sources,
        breakingText: body.breakingText !== undefined ? body.breakingText : current.breakingText,
      };
      writeData(updated);
      console.log('✅ [DEV] Data saved to JSON file');
    } else {
      // PRODUCTION: Write to Neon database
      const current = await readDataFromDB();
      const updated = {
        news: body.news ?? current.news,
        trending: body.trending ?? current.trending,
        sources: body.sources ?? current.sources,
        breakingText: body.breakingText !== undefined ? body.breakingText : current.breakingText,
      };
      await writeDataToDB(updated);
      console.log('✅ [PROD] Data saved to Neon database');
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    console.error('POST error:', e);
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};