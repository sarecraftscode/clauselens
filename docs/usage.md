# Utilisation de ClauseLens

## Prérequis

La stack doit être démarrée et configurée (`docker compose up -d`).  
Voir [installation.md](installation.md) et [configuration.md](configuration.md).

---

## 1. Activer l'écoute du webhook dans n8n

Le workflow principal attend les requêtes via un webhook. Deux modes existent selon l'usage.

### Mode test (développement)

1. Ouvrez n8n : `http://localhost:5678`
2. Ouvrez le workflow **ClauseLens Main**
3. Cliquez sur **Test workflow** (bouton en bas à droite)
4. n8n affiche **Waiting for test event…** — le webhook est actif

> En mode test, n8n écoute sur `http://localhost:5678/webhook-test/<path>`.  
> Ce mode s'arrête automatiquement après réception d'une requête ou si vous quittez l'éditeur.

### Mode production (usage normal)

1. Ouvrez le workflow **ClauseLens Main**
2. Activez le workflow avec le toggle **Active** en haut à droite
3. Le webhook écoute en permanence sur `http://localhost:5678/webhook/<path>`

---

## 2. Ouvrir l'interface

Ouvrez le fichier `web/clause-radar.html` directement dans votre navigateur :

```bash
# Linux
xdg-open web/clause-radar.html

# macOS
open web/clause-radar.html
```

Ou glissez-déposez le fichier dans votre navigateur.

> **Note — URL du webhook** : la page utilise actuellement `webhook-test/clause-lens`.  
> Le webhook du workflow est configuré sur le path `clause-radar`.  
> Si la page ne reçoit pas de réponse, vérifiez que les deux correspondent, ou corrigez l'URL dans `web/clause-radar.html` ligne 1522 :
> ```js
> const WEBHOOK_URL = "http://localhost:5678/webhook-test/clause-radar";
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
