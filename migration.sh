
# generate a typescript file that export 2 async function named up and down
generate_migration_file() {
	current_timestamp=$(date +%Y%m%d%H%M%S)

	echo -e "import { Kysely } from 'kysely'\n\n" > "./migrations/${current_timestamp}_$1_migration.ts"
  echo -e "export async function up(db: Kysely<unknown>) {\n\n}" >> "./migrations/${current_timestamp}_$1_migration.ts"
  echo -e "export async function down(db: Kysely<unknown>) {\n\n}" >> "./migrations/${current_timestamp}_$1_migration.ts"
}

generate_migration_file "$1"

