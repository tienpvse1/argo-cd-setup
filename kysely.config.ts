import { PostgresDialect } from 'kysely';
import { defineConfig } from 'kysely-ctl';
import { Pool } from 'pg';
import 'dotenv/config';

const dialect = new PostgresDialect({
	pool: new Pool({
		host: process.env.POSTGRES_HOST,
		port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
	}),
});

export default defineConfig({
	dialect,
	migrations: {
		migrationFolder: './migrations',
	},
	seeds: {},
});
