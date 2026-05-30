#!/usr/bin/env bash
set -euo pipefail

# ── Load .env ─────────────────────────────────────────────────────────────────
ENV_FILE="$(dirname "$0")/../../.env"
if [ -f "$ENV_FILE" ]; then
  set -o allexport
  source "$ENV_FILE"
  set +o allexport
fi

LANGFUSE_PUBLIC_KEY="${LANGFUSE_PUBLIC_KEY:?LANGFUSE_PUBLIC_KEY non défini dans .env}"
LANGFUSE_SECRET_KEY="${LANGFUSE_SECRET_KEY:?LANGFUSE_SECRET_KEY non défini dans .env}"
LANGFUSE_URL="${LANGFUSE_URL:-http://localhost:3000}"

AUTH=$(echo -n "${LANGFUSE_PUBLIC_KEY}:${LANGFUSE_SECRET_KEY}" | base64 -w 0)

PROMPTS_DIR="$(dirname "$0")"
TARGET="${1:-}"   # optional: import a single prompt by name

# ── Import JSON prompts ────────────────────────────────────────────────────────
for file in "$PROMPTS_DIR"/*.json; do
  [ -f "$file" ] || continue
  name=$(basename "$file" .json)
  [ -n "$TARGET" ] && [ "$name" != "$TARGET" ] && continue
  echo "Importing JSON prompt: $name"
  curl -s -X POST "$LANGFUSE_URL/api/public/v2/prompts" \
    -H "Authorization: Basic $AUTH" \
    -H "Content-Type: application/json" \
    -d @"$file"
  echo ""
done

# ── Import TXT prompts ─────────────────────────────────────────────────────────
for file in "$PROMPTS_DIR"/*.txt; do
  [ -f "$file" ] || continue
  name=$(basename "$file" .txt)
  [ -n "$TARGET" ] && [ "$name" != "$TARGET" ] && continue
  echo "Importing TXT prompt: $name"
  payload=$(jq -n \
    --arg name "$name" \
    --arg prompt "$(cat "$file")" \
    '{name: $name, prompt: $prompt, labels: ["production"]}')
  curl -s -X POST "$LANGFUSE_URL/api/public/v2/prompts" \
    -H "Authorization: Basic $AUTH" \
    -H "Content-Type: application/json" \
    -d "$payload"
  echo ""
done
