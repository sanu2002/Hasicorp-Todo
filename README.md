# Hasicrop-Todo


Problem :- Your teammate clones the repo, sees POSTGRES_PASSWORD= empty, and messages you: "bro send the .env". Straight back to WhatsApp or slack .

A full-stack todo app that exists to demonstrate two
team practices, not to be a product:

1. **Secrets with HashiCorp Vault** - no credential
   ever lives in git, Slack, or WhatsApp.
2. **GitHub Flow** - every change ships through a
   branch and a pull request.

## Stack

| Layer    | Tech                        |
| -------- | --------------------------- |
| Frontend | React 19 + Vite             |
| Backend  | Node.js + Express           |
| Database | PostgreSQL (Docker)         |
| Secrets  | HashiCorp Vault (Community) |

## Rules for this repo

- Never commit a real secret.
- `.env.example` lists secret NAMES only, never values.
- The React client holds no credentials. It calls
  `/api/*` and nothing else.
- Never push to `main`. Branch, open a PR, get review.

## Status

Phase 0 of 10 - repo foundation.
