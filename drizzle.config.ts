import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/server/schema.ts',
	out: './db/drizzle',
	dialect: 'sqlite',
	dbCredentials: {
		url: './db/database.db'
	}
} satisfies Config;
