
# generate a typescript file that export 2 async function named up and down
generate_migration_file() {
	migration_module_name=$1
	migration_name=$2
	current_timestamp=$(date +%Y%m%d%H%M%S)
	# allows migration module to be one of the following: "core", "order", "payment"
  if [ "$migration_module_name" != "core" ] && [ "$migration_module_name" != "order" ] && [ "$migration_module_name" != "payment" ]; then
    echo "Migration module name must be one of the following: testing-container, order, payment-gateway, notification"
    exit 1
  fi

	echo "Creating migration file for ${migration_module_name} module with name: ${migration_name}"

	echo -e "import { Kysely } from 'kysely'\n\n" > "./apps/${migration_module_name}/migrations/${current_timestamp}_${migration_name}_migration.ts"
  echo -e "export async function up(db: Kysely<unknown>) {\n\n}" >> "./apps/${migration_module_name}/migrations/${current_timestamp}_${migration_name}_migration.ts"
  echo -e "export async function down(db: Kysely<unknown>) {\n\n}" >> "./apps/${migration_module_name}/migrations/${current_timestamp}_${migration_name}_migration.ts"
}

generate_migration_file "$1" "$2"

