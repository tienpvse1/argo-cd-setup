import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
	await db.schema
		.withSchema('public')
		.createTable('account')
		.addColumn('id', 'text', (col) => col.primaryKey())
		.addColumn('userId', 'text', (col) => col.notNull())
		.addColumn('accountId', 'text', (col) => col.notNull())
		.addColumn('providerId', 'text', (col) => col.notNull())
		.addColumn('accessToken', 'text')
		.addColumn('refreshToken', 'text')
		.addColumn('accessTokenExpiresAt', 'timestamp')
		.addColumn('refreshTokenExpiresAt', 'timestamp')
		.addColumn('scope', 'text')
		.addColumn('idToken', 'text')
		.addColumn('password', 'text')
		.addColumn('createdAt', 'timestamp')
		.addColumn('updatedAt', 'timestamp')
		.addForeignKeyConstraint('user_id_fk', ['userId'], 'user', ['id'])
		.execute();
}
export async function down(db: Kysely<unknown>) {
	await db.schema.withSchema('public').dropTable('account').execute();
}
