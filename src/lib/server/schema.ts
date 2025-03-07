import { sql } from 'drizzle-orm';
import { integer as sqliteInteger, text as sqliteText, sqliteTable } from 'drizzle-orm/sqlite-core';
import { int as mysqlInt, varchar as mysqlVarchar, text as mysqlText, timestamp, mysqlTable } from 'drizzle-orm/mysql-core';

export const Kudos = process.env.DB_TYPE === 'mysql'
  ? mysqlTable('kudos', {
    id: mysqlInt('id', { unsigned: true }).primaryKey().autoincrement().notNull(),
    from: mysqlVarchar('from', { length: 255 }).notNull(),
    to: mysqlVarchar('to', { length: 255 }).notNull(),
    message: mysqlText('message').notNull(),
    kind: mysqlVarchar('kind', { length: 50 }).notNull(),
    date: timestamp('date').defaultNow().notNull(),
  })
  : sqliteTable('kudos', {
    id: sqliteInteger('id', { mode: 'number' }).primaryKey({ autoIncrement: true }).notNull(),
    from: sqliteText('from').notNull(),
    to: sqliteText('to').notNull(),
    message: sqliteText('message').notNull(),
    kind: sqliteText('kind').notNull(),
    date: sqliteText('date').default(sql`CURRENT_TIMESTAMP`).notNull(),
  });
