# Deploy the To-Do List App

## Architecture

| Part | Platform | Purpose |
|------|----------|---------|
| Frontend (web) | **Vercel** | Public website everyone can open |
| Backend API | **Render** | NestJS REST API |
| Database | **Render PostgreSQL** | Stores todos |

The browser extension still runs locally and calls your API URL.

---

## Step 1 — Push to GitHub

Already at: https://github.com/Shirapti-nath/todo-list-app

---

## Step 2 — Deploy backend + database on Render (free)

1. Go to https://render.com and sign up (use GitHub login).
2. Click **New** → **Blueprint**.
3. Connect repo `Shirapti-nath/todo-list-app`.
4. Render reads [`render.yaml`](render.yaml) and creates:
   - PostgreSQL database `todo-list-db`
   - Web service `todo-list-api`
5. Wait until the API is **Live**. Copy its URL, e.g.  
   `https://todo-list-api.onrender.com`

Test: open `https://YOUR-API-URL/todos` — you should see `[]`.

---

## Step 3 — Deploy frontend on Vercel (free)

1. Go to https://vercel.com and sign up with GitHub.
2. **Add New Project** → import `todo-list-app`.
3. Settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Environment Variables** — add:
   - `VITE_API_URL` = `https://YOUR-API-URL.onrender.com` (no trailing slash)
5. Click **Deploy**.

Your live app will be at `https://your-project.vercel.app`.

---

## Step 4 — Connect frontend to backend

In Render, open the `todo-list-api` service → **Environment** → set:

```
ALLOWED_ORIGINS=https://your-project.vercel.app
```

Save (service redeploys). The web app can now call the API.

---

## Local development

```bash
# Backend
cd backend && npm run start:dev

# Web app
cd frontend && npm run dev

# Browser extension
cd frontend && npm run build:extension
# Load frontend/dist in chrome://extensions
```

---

## Notes

- Render free tier sleeps after ~15 min idle — first request may take ~30 seconds.
- Extension build: use `npm run build:extension`, not the default `npm run build`.
- Never commit `.env` files with real passwords.
