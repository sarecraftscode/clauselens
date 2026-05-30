# ClauseLens

ClauseLens est une solution d'extraction automatique des clauses importantes dans les conditions générales (CGU, CGV, CGA, etc.).

## Stack technique

| Service | Rôle | Port |
|---|---|---|
| **LiteLLM** | Proxy LLM unifié (OpenAI, Anthropic, Groq...) | `4000` |
| **Langfuse** | Observabilité, traces et gestion des prompts | `3000` |
| **n8n** | Orchestration des workflows d'extraction | `5678` |
| **PostgreSQL** | Base de données principale | — |
| **Redis** | Cache et file d'attente | — |

## Démarrage rapide

> **Prérequis** — Docker 24+, Docker Compose v2, openssl, curl, jq et au moins une clé API LLM.
> Voir [docs/installation.md](docs/installation.md) pour le détail.

### 1. Configurer l'environnement

```bash
cp .env.example .env
```

Générez les secrets et renseignez-les **directement dans `.env`** (ne pas utiliser `echo >>` — cela créerait des doublons avec les entrées vides du template) :

| Variable | Commande |
|---|---|
| `LANGFUSE_NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `LANGFUSE_SALT` | `openssl rand -base64 32` |
| `LANGFUSE_ENCRYPTION_KEY` | `openssl rand -hex 32` ⚠️ hex uniquement |
| `N8N_ENCRYPTION_KEY` | `openssl rand -base64 32` |

> `LANGFUSE_ENCRYPTION_KEY` doit être en **hexadécimal** (64 chars). Le format base64 provoque une erreur au démarrage de Langfuse.

Renseignez vos clés API dans `.env` :

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
LITELLM_MASTER_KEY=sk-changeme
```

### 2. Lancer la stack

```bash
docker compose up -d
```

### 3. Accéder aux interfaces

| Interface | URL | Identifiants |
|---|---|---|
| Langfuse | http://localhost:3000 | compte créé au premier lancement |
| LiteLLM | http://localhost:4000/ui | `admin` / `LITELLM_MASTER_KEY` |
| n8n | http://localhost:5678 | compte créé au premier lancement |

### 4. Connecter Langfuse à LiteLLM

Après la création de votre compte Langfuse :
1. Créez un projet → copiez la **Public Key** et la **Secret Key**
2. Renseignez-les dans `.env` :
```env
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_SECRET_KEY=sk-lf-...
```
3. Redémarrez LiteLLM : `docker compose up -d litellm`

### 5. Connecter n8n à LiteLLM

Dans n8n, barre latérale gauche → **Credentials** → **Add credential** → **OpenAI** :
- **API Key** : votre clé LiteLLM
- **Base URL** : `http://litellm:4000`

## Gestion des prompts

Les prompts d'extraction sont versionnés dans Langfuse. Pour importer des prompts :

```bash
# Déposez vos fichiers .txt ou .json dans langfuse/prompts/
./langfuse/prompts/import.sh
```

Les fichiers `.txt` utilisent le nom du fichier comme identifiant du prompt.
Les fichiers `.json` permettent de définir la configuration complète (modèle, température, labels).

## Import de workflows n8n

Déposez vos fichiers JSON dans `n8n/workflows/` puis exécutez :

```bash
docker compose up n8n-import
```

## Générer la présentation

```bash
make presentation        # PDF + HTML
make presentation-pdf    # PDF uniquement
make presentation-html   # HTML uniquement
```

Prérequis : Docker. Les fichiers générés (`docs/presentation.pdf`, `docs/presentation.html`) sont ignorés par git.

## Arrêter la stack

```bash
docker compose down        # arrêt simple
docker compose down -v     # arrêt + suppression des données
```
