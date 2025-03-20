import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

import mysql from 'mysql2/promise';
import { drizzle as drizzleMysql } from 'drizzle-orm/mysql2';

import * as dotenv from 'dotenv'
dotenv.config();

const dbType = process.env.DB_TYPE || 'sqlite'; // default to sqlite if not defined

let dbConnection;

if (dbType === 'mysql') {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? +process.env.DB_PORT : 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    charset: 'utf8mb4_unicode_520_ci', // Should be same as DB
    timezone: 'Z', // UTC
    waitForConnections: true,
    queueLimit: 10,
    idleTimeout: 600000 // 10 minutes
  });
  dbConnection = drizzleMysql(pool);
} else {
  const sqlite = new Database('./db/database.db');
  dbConnection = drizzleSqlite(sqlite);
}

export const db = dbConnection;
