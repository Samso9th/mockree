import { defineConfig } from 'drizzle-kit'

const dbUrl = process.env.DRIZZLE_DB_URL; //removed NEXT_PUBLIC_
if (!dbUrl) {
  throw new Error('Database URL is not defined');
}

export default defineConfig({
  schema: "./utils/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
  verbose: true,
  strict: true,
})