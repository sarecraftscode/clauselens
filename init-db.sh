#!/bin/bash
# Creates the per-service databases inside the shared PostgreSQL instance.
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE langfuse;
    CREATE DATABASE litellm;
    CREATE DATABASE n8n;
EOSQL
