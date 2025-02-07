#!/bin/sh
set -e  # Exit immediately if a command exits with a non-zero status.

# Determine the directory where this script is located and the project root.
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Change to the project root.
cd "$PROJECT_ROOT"

# Ensure a migration name is provided.
if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <MigrationName>"
  exit 1
fi

MIGRATION_NAME="$1"
echo "Generating migration at: ${PROJECT_ROOT}/src/database/migrations/${MIGRATION_NAME}"

# Run the TypeORM CLI command.
yarn typeorm migration:generate "src/database/migrations/${MIGRATION_NAME}"