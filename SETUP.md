# StyleMyCrown Development Setup

## 1. Backend (Python AI)

The backend handles image processing and AI logic.

**Setup:**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
```

**Run:**

```bash
python main.py
```

Server will run at `http://localhost:8000`.

## 2. Frontend (Next.js Application)

The frontend is the user interface.

**Setup:**
(Dependencies are installed automatically on creation)

**Run:**

```bash
cd frontend
npm run dev
```

App will run at `http://localhost:3000`.

## 3. Environment Variables

Create a `.env` file in `frontend` with your keys:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
