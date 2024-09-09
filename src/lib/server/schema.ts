import { sql } from 'drizzle-orm';
import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const Kudos = sqliteTable('kudos', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }).notNull(),
	from: text('from').notNull(),
	to: text('to').notNull(),
	message: text('message').notNull(),
	kind: text('kind').notNull(),
	date: text('date')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull()
});
