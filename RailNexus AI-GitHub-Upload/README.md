# RailNexus AI

RailNexus AI is a React dashboard prototype for exploring railway block planning and maintenance scheduling. It demonstrates prioritizing maintenance work and allocating it to corridor windows while accounting for capacity and timetable conflicts.

> **Prototype notice:** This project uses sample data and a client-side demonstration optimizer. It is not an official Indian Railways product, does not connect to railway systems, and must not be used for real-world planning or safety decisions. The sign-in screen and its sample credentials are for demonstration only; authentication is not secure.

## Features

- Schedule maintenance tasks by criticality, overdue duration, and work window
- Account for corridor capacity and scheduled train conflicts in the demo optimizer
- Review weekly and monthly plans, network health, maintenance queues, and generated insights
- Add, edit, and manage sample maintenance tasks in the dashboard
- Responsive dashboard layout for desktop and smaller screens

## Requirements

- Node.js 18 or later
- npm (included with Node.js)

## Run locally

From the project directory:

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### Demo sign-in

Use the credentials displayed on the sign-in screen:

```text
Username: admin
Password: admin123
```

These credentials and all user records are embedded in the frontend source. They are public demo values, not secure authentication. Do not use real passwords or personal information.

## Production build

```bash
npm run build
npm run preview
```

Vite writes the production build to `dist/`. The preview command serves that build locally.

## Project structure

```text
.
├── index.html       # Vite page entry
├── package.json     # Scripts and dependencies
├── src/
│   ├── App.jsx      # Dashboard, demo login, and scheduling UI
│   └── main.jsx     # React application entry point
└── styles.css       # Dashboard styling
```

## Data and limitations

The application currently runs entirely in the browser with hard-coded sample train, corridor, and maintenance data. It has no backend, database, external API integration, production authentication, or safety validation. Changes made during a session are not a substitute for a persistent operational record.

Before adapting this prototype for real use, replace the sample data and client-side sign-in with approved, secure services; validate the scheduling algorithm with domain experts; and complete operational, security, and safety reviews.
