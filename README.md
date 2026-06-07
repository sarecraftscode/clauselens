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

## Initialisation

> **Prérequis** — Docker 24+, Docker Compose v2, openssl, curl, jq et au moins une clé API Mistral.

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
| `LITELLM_MASTER_KEY` | Renseigner votre valeur |

> `LANGFUSE_ENCRYPTION_KEY` doit être en **hexadécimal** 


### 2. Lancer la stack

```bash
docker compose up -d
```

# Configuration initiale

Suivez ces étapes **dans l'ordre** après le premier `docker compose up -d`.

## Étape 1 — Créer un compte Langfuse

1. Ouvrez `http://localhost:3000`
2. Cliquez **Sign Up** et créez votre compte administrateur
3. Créez un **projet** (ex: `clauselens`)
4. Allez dans **Settings** → **API Keys** → copiez la **Public Key** et la **Secret Key**

## Étape 2 — Connecter Langfuse à LiteLLM

Renseignez les clés Langfuse dans `.env` :

```env
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_SECRET_KEY=sk-lf-...
```

Redémarrez LiteLLM :

```bash
docker compose up -d litellm
```

## Étape 3 — Vérifier LiteLLM

1. Ouvrez `http://localhost:4000/ui`
2. Connectez-vous avec `admin` / votre `LITELLM_MASTER_KEY`
3. Vérifiez que les modèles sont listés (`gpt-4o`, `gpt-4o-mini`, etc.)

Générez une **Virtual Key** pour n8n : **Virtual Keys** → **Create New Key**

## Étape 4 — Créer un compte n8n

1. Ouvrez `http://localhost:5678`
2. Créez votre compte administrateur

## Étape 5 — Importer les workflows n8n

Importez les workflows avant de configurer les credentials — cela permet à n8n d'afficher les types de credentials utilisés.

```bash
docker compose up n8n-import
```

## Étape 6 — Configurer la credential LiteLLM dans n8n

**Barre latérale gauche** → **Credentials** → **Add credential** → **OpenAI** :

- **API Key** : la Virtual Key générée à l'étape 3
- **Base URL** : `http://litellm:4000`

> Tous les nœuds OpenAI de n8n passeront par LiteLLM et seront tracés dans Langfuse.

## Étape 7 — Installer le node Langfuse dans n8n

Le node Langfuse n'est pas inclus par défaut dans n8n — il doit être installé via la communauté.

1. Ouvrez le sous-workflow **ClauseLens Sub Workflow** dans n8n
2. Cliquez sur un nœud **Langfuse** dans le canvas
3. n8n propose d'installer le node manquant — cliquez **Install**
4. Attendez la confirmation d'installation, puis rechargez la page

> Sans cette étape, le type de credential **Langfuse** n'apparaît pas dans la liste lors de la création.

## Étape 8 — Configurer la credential Langfuse dans n8n

**Barre latérale gauche** → **Credentials** → **Add credential** → **Langfuse** :

- **Langfuse URL** : `http://langfuse:3000`
- **Public Key** : votre Public Key Langfuse
- **Secret Key** : votre Secret Key Langfuse

> Utilisez `langfuse` et non `localhost` — n8n communique avec Langfuse via le réseau Docker interne.

## Étape 9 — Importer les prompts dans Langfuse

```bash
# Tous les prompts
./langfuse/prompts/import.sh

# Un seul prompt
./langfuse/prompts/import.sh nom-du-prompt
```


# Utilisation de ClauseLens

## Prérequis

La stack doit être démarrée et configurée (`docker compose up -d`).  

---

## 1. Activer l'écoute du webhook dans n8n

Le workflow principal attend les requêtes via un webhook. Deux modes existent selon l'usage.

### Mode test (développement)

1. Ouvrez n8n : `http://localhost:5678`
2. Ouvrez le workflow **ClauseLens Main**
3. Cliquez sur **Execute workflow** (bouton en bas)
4. n8n affiche **Waiting for test event…** — le webhook est actif

> En mode test, n8n écoute sur `http://localhost:5678/webhook-test/clause-lens`.  
> Ce mode s'arrête automatiquement après réception d'une requête ou si vous quittez l'éditeur.

### Mode production (usage normal, non accessible en local)

1. Ouvrez le workflow **ClauseLens Main**
2. Activez le workflow avec le toggle **Active** en haut à droite
3. Le webhook écoute en permanence sur `http://localhost:5678/webhook/clause-lens`

---

## 2. Ouvrir l'interface

Ouvrez le fichier `web/clause-lens.html` directement dans votre navigateur :

```bash
# Linux
xdg-open web/clause-lens.html

# macOS
open web/clause-lens.html
```

Ou glissez-déposez le fichier dans votre navigateur.

> **Note — URL du webhook** : la page utilise actuellement `webhook-test/clause-lens`.  
> Le webhook du workflow est configuré sur le path `clause-lens`.  
> Si la page ne reçoit pas de réponse, vérifiez que les deux correspondent, ou corrigez l'URL WEBHOOK_URL dans `web/clause-lens.js` :
> ```js
> const WEBHOOK_URL = "http://localhost:5678/webhook-test/clause-lens";
> ```

---

## 3. Analyser un document

1. Dans l'interface, collez ou déposez le texte des conditions générales
2. Cliquez sur **Analyser**
3. ClauseLens envoie le texte au webhook → n8n orchestre l'extraction → le résultat s'affiche

---

## Résumé du flux

```
Interface HTML → Webhook n8n (ClauseLens Main)
                     ↓
             Sous-workflow (détection type + extraction LLM via LiteLLM)
                     ↓
             Réponse → Interface HTML
```

Les traces d'exécution sont visibles dans Langfuse : `http://localhost:3000`.


## Arrêter la stack

```bash
docker compose down        # arrêt simple
docker compose down -v     # arrêt + suppression des données
```

## Après chaque modification du fichier de config de litellm
```bash
docker compose restart litellm
```

## Trooboolshoting
### L'appel au LLM échoue
Vérifier que votre clé API est correcte et bien renseigné dans le fichier .env

## A venir (Utilisation de ollama pour lancer le modèle de test en local)