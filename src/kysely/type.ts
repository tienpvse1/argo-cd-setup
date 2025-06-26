import { Kysely } from 'kysely';
import { Database } from './schema';

export type KyselyInstance = Kysely<Database>;
