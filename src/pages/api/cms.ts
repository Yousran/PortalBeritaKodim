import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

const DATA_FILE = path.resolve('data/cms.json');

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

export const GET: APIRoute = async () => {
  const data = readData();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const current = readData();

    // Merge: hanya update field yang dikirim
    const updated = {
      news: body.news ?? current.news,
      trending: body.trending ?? current.trending,
      sources: body.sources ?? current.sources,
      breakingText: body.breakingText !== undefined ? body.breakingText : current.breakingText,
    };

    writeData(updated);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};