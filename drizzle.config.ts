import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv'
dotenv.config();

let dialect: 'sqlite' | 'mysql' | 'postgres';
dialect = process.env.DB_TYPE === 'mysql' ? 'mysql' : 'sqlite';

let dbCredentials = { url: './db/database.db' };
if (dialect === 'mysql') {
	dbCredentials = { url: `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}` };
}

export default {
	schema: './src/lib/server/schema.ts',
	out: './db/drizzle',
	dialect,
	dbCredentials
} satisfies Config;
