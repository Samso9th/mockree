import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

let db: ReturnType<typeof drizzle>;

if (typeof window === 'undefined') {
  // Server-side only
  const sql = neon(process.env.DRIZZLE_DB_URL!);
  db = drizzle(sql, { schema });
} else {
  // Client-side: provide a dummy implementation or throw an error
  console.error('Attempting to access database from client-side');
  db = new Proxy({}, {
    get() {
      throw new Error('Cannot access database on the client-side');
    }
  }) as any;
}

export { db };