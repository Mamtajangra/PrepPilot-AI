# PrepPilot AI

PrepPilot AI is a full-stack study companion that helps students organize learning, generate personalized study plans, and assess progress through AI-powered tools. It combines a FastAPI backend with a React frontend to provide secure authentication, study tracking, calendar planning, analytics, and AI-generated study materials.

## Overview

The application is designed for learners who want to:

- plan daily or weekly study schedules
- generate AI-based study plans for target exams and subjects
- create quizzes and practice tests
- save study notes and AI-generated insights
- track progress through dashboards and analytics
- manage personal study calendar and goal completion

## Key Features

- User authentication and protected routes
- AI-powered study planner generation
- AI-generated quiz creation
- AI notes generation and management
- Dashboard with progress statistics
- Weekly progress metrics and completion tracking
- Calendar-based personal study planning
- My Plans, My Quizzes, and topic tracking
- Responsive frontend for desktop and mobile views

## Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Recharts
- React Toastify
- Axios

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite (default local database)
- JWT authentication
- Pydantic
- Google Generative AI
- Groq

## Project Structure

```text
PrepPilot-AI/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   └── router.py
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── main.py
│   │   └── __init__.py
│   ├── requirements.txt
│   └── preppilot.db
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── docs/
├── README.md
├── package.json
└── structure.txt
```

## Prerequisites

Before starting the app, make sure you have:

- Python 3.10+
- Node.js 18+
- npm or yarn
- Git

## Environment Setup

### 1. Backend setup

From the project root:

```bash
cd backend
python -m venv .venv
```

On Windows PowerShell:

```powershell
backend\.venv\Scripts\Activate.ps1
```

On macOS/Linux:

```bash
source .venv/bin/activate
```

Then install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory with the required keys:

```env
GEMINI_API_KEY=your_gemini_key_here
GROQ_API_KEY=your_groq_key_here
```

> The app is configured to use SQLite locally by default, so no external database server is required for initial development.

### 2. Frontend setup

From the project root:

```bash
cd frontend
npm install
```

## Running the Application

### Start the backend

```bash
cd backend
uvicorn app.main:app --reload
```

The backend will run at:

- http://127.0.0.1:8000
- API docs: http://127.0.0.1:8000/docs

### Start the frontend

In a separate terminal:

```bash
cd frontend
npm run dev
```

The frontend will run at:

- http://127.0.0.1:5173

## Default App Behavior

- Frontend uses the backend API at `http://127.0.0.1:8000/api/v1`
- Auth tokens are stored in localStorage
- Protected routes redirect users to login when no valid token is present
- Tables are created automatically on application startup

## Main API Modules

The FastAPI backend includes modules for:

- Authentication
- Planner management
- AI study plan generation
- AI quiz generation
- AI notes generation
- User and dashboard APIs

Examples of main router prefixes:

- `/api/v1/auth`
- `/api/v1/planner`
- `/api/v1/ai`
- `/api/v1/quiz`
- `/api/v1/notes`

## Development Notes

- The backend uses SQLite for local storage in development.
- The frontend is served by Vite and supports hot reload.
- AI features rely on API keys configured in the backend environment.
- The app is intended as a learning and productivity platform centered around exam preparation and study planning.

## Common Troubleshooting

### Missing API key

If you see errors related to Gemini or Groq generation, make sure your `.env` file exists inside `backend/` and contains the correct keys.

### CORS or connection issues

Ensure the FastAPI backend is running and the frontend is pointing to the same local URL:

```text
http://127.0.0.1:8000/api/v1
```

### Database setup issues

If the database is not created automatically, run the backend once so startup tables are initialized.

## Future Enhancements

Potential features for future versions include:

- richer analytics and forecasting
- deeper AI personalization
- export/import of plans and notes
- multi-user team or classroom mode
- deployment-ready configuration for production hosting

## License

This project is currently intended for educational and personal development use. Add your preferred license before production deployment if needed.

## Contributing

Contributions are welcome. To contribute:

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Open a pull request

## Support

For setup help or project guidance, check the codebase structure and the FastAPI docs for backend endpoints, then validate the frontend API configuration in the client services.
