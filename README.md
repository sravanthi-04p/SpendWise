# Spend Wise 💸

A full-stack expense tracking application where users can monitor their income and spending, categorize transactions, and visualize their financial activity through an interactive dashboard.

**Live Demo:** _[add your Vercel URL here once deployed]_
**Backend API:** _[add your Render URL here once deployed]_

> ⚠️ The backend runs on Render's free tier, which spins down after periods of inactivity. The first request after idle time may take 30–60 seconds to respond while the server wakes up.

---

## 🔑 Demo Credentials

Try the app instantly without signing up:

```
Email: test@example.com
Password: password123
```

This account has an admin role and pre-loaded sample transactions, so you can see the Dashboard, Transactions, and Admin views populated with real data right away.

---

## ✨ Features

- **Authentication** — secure registration/login with JWT-based sessions and hashed passwords
- **Dashboard** — real-time credit/debit balance overview, recent transactions, and a 7-day spending chart
- **Transactions** — full CRUD (create, read, update, delete) with filtering by type (All / Debit / Credit)
- **Profile** — view and edit personal details (name, address, city, postal code, country)
- **Admin view** — role-gated dashboard showing aggregated totals across all users
- **Responsive UI** — built to match a Figma design spec, with modals for adding/editing/deleting transactions and confirming logout

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router
- Axios
- Recharts (data visualization)
- Lucide React (icons)

**Backend**
- Node.js / Express
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing
- SQLite (better-sqlite3) — _or PostgreSQL, if migrated for deployment_

---

## 📁 Project Structure

```
spendwise/
├── backend/
│   ├── src/
│   │   ├── config/         # Database connection
│   │   ├── models/         # SQL queries
│   │   ├── controllers/    # Request handlers / business logic
│   │   ├── routes/         # Express route definitions
│   │   ├── middleware/     # Auth guard, error handling
│   │   ├── utils/          # JWT helper
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/     # Layout, modals, shared UI
    │   ├── pages/          # Login, Register, Dashboard, Transactions, Profile, Admin
    │   ├── api/             # Axios instance with auth interceptor
    │   ├── context/         # Auth context (login state, JWT)
    │   └── App.jsx
    └── package.json
```

---

## 🚀 Running Locally

### Backend

```bash
cd backend
npm install
cp .env.example .env   # then fill in your own JWT_SECRET
npm run dev
```
Runs on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`.

Make sure the backend is running before using the frontend — the app calls `http://localhost:5000/api` for all data.

---

## 📡 API Reference

All endpoints are prefixed with `/api`. Protected routes require an `Authorization: Bearer <token>` header, obtained from login/register.

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Create a new account |
| POST | `/auth/login` | Log in, returns a JWT |

### Profile
| Method | Endpoint | Description |
|---|---|---|
| GET | `/rest/profile` | Get the logged-in user's profile |
| PUT | `/rest/profile` | Update profile fields |

### Transactions
| Method | Endpoint | Description |
|---|---|---|
| GET | `/rest/all-transactions` | List transactions (optional `?type=debit\|credit`) |
| POST | `/rest/add-transaction` | Create a transaction |
| POST | `/rest/update-transaction` | Update a transaction |
| POST | `/rest/delete-transaction` | Delete a transaction |
| GET | `/rest/credit-debit-totals` | Sum of amounts by type |
| GET | `/rest/daywise-totals-7-days` | Last 7 days, grouped by day and type |
| GET | `/rest/get-user-id` | Returns the logged-in user's ID |

### Admin (requires `role: admin`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/rest/transaction-totals-admin` | Totals across all users |
| GET | `/rest/daywise-totals-last-7-days-admin` | Last 7 days across all users |

---

## 🎨 Design

UI built from a Figma design spec ("Money Matters" template), adapted and rebranded as **Spend Wise**.

---

## 📝 Notes

- Passwords are hashed with bcrypt before storage — never stored in plain text.
- JWT tokens expire after 7 days.
- Admin role must currently be set manually in the database (no public signup path for admins, by design).
