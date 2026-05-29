#!/bin/bash
AUTH=$(echo -n 'pk-lf-74aacc47-3aee-438c-9009-6b494af081ac:sk-lf-aac7bcc1-29c7-4666-b285-eb125786a7a4' | base64 -w 0)
LANGFUSE_URL="http://localhost:3000"

# Import JSON prompts
for file in ./langfuse/prompts/*.json; do
  [ -f "$file" ] || continue
  name=$(basename "$file" .json)
  echo "Importing JSON prompt: $name"
  curl -s -X POST "$LANGFUSE_URL/api/public/v2/prompts" \
    -H "Authorization: Basic $AUTH" \
    -H "Content-Type: application/json" \
    -d @"$file"
  echo ""
done

# Import TXT prompts (filename without extension = prompt name)
for file in ./langfuse/prompts/*.txt; do
  [ -f "$file" ] || continue
  name=$(basename "$file" .txt)
  content=$(cat "$file")
  echo "Importing TXT prompt: $name"
  payload=$(jq -n \
    --arg name "$name" \
    --arg prompt "$content" \
    '{name: $name, prompt: $prompt, labels: ["production"]}')
  curl -s -X POST "$LANGFUSE_URL/api/public/v2/prompts" \
    -H "Authorization: Basic $AUTH" \
    -H "Content-Type: application/json" \
    -d "$payload"
  echo ""
done
