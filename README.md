# BudgetTrack

BudgetTrack is a simple expense tracker with a Vue.js frontend and a Node/Express
backend. The frontend consumes REST endpoints to list, create, update, delete
expenses and to fetch dashboard summaries.

## Repository Structure

- `frontend/` Vue 3 app (Vite)
- `backend/` Node.js API (Express + MongoDB)

## Prerequisites

- Node.js 18+ (or newer)
- npm
- MongoDB running locally

## Frontend (Vue)

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:5173`.

## Backend (Express)

```bash
cd backend
npm install
npm run dev
```

API runs on `http://localhost:3000`.

## API Endpoints

Base URL: `http://localhost:3000/api`

- `GET /expenses` list all expenses
- `POST /expenses` create expense
- `PUT /expenses/:id` update expense
- `DELETE /expenses/:id` delete expense
- `GET /summary` dashboard summary data

### Expense Payload

```json
{
  "title": "Starbucks Coffee",
  "amount": 85,
  "category": "Food",
  "date": "2026-01-14"
}
```
