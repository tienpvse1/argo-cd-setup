import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
	await db.schema
		.withSchema('public')
		.alterTable('user')
		.addColumn('role', 'text')
		.addColumn('banned', 'boolean')
		.addColumn('banReason', 'boolean')
		.addColumn('banExpires', 'boolean')
		.execute();
	await db.schema
		.withSchema('public')
		.alterTable('session')
		.addColumn('impersonatedBy', 'text')
		.execute();
}

export async function down(db: Kysely<unknown>) {
	await db.schema
		.withSchema('public')
		.alterTable('session')
		.dropColumn('impersonatedBy')
		.execute();
	await db.schema
		.withSchema('public')
		.alterTable('user')
		.dropColumn('banExpires')
		.dropColumn('banReason')
		.dropColumn('banned')
		.dropColumn('role')
		.execute();
}
