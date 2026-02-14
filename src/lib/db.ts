import { neon } from '@neondatabase/serverless';

// Deteksi environment
export const isDev = import.meta.env.DEV || process.env.NODE_ENV === 'development';

// Neon database connection (hanya untuk production)
let sql: ReturnType<typeof neon> | null = null;

if (!isDev && process.env.DATABASE_URL) {
  sql = neon(process.env.DATABASE_URL);
}

export { sql };

// Helper untuk query database
export async function queryDatabase(query: string, params: any[] = []) {
  if (!sql) {
    throw new Error('Database not available in development mode or DATABASE_URL not set');
  }
  return await sql(query, params);
}
