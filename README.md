# FinanceIQ Frontend

## Project Overview

FinanceIQ Frontend is a React-based web application built for managing personal finances, visualizing financial data, and interacting with an AI-powered financial assistant.

The application provides a clean dashboard experience with transaction management, analytics, role-based access control, and real-time integration with the Finance Backend RBAC System.

---

## Tech Stack

* React
* Vite
* JavaScript (ES6+)
* Tailwind CSS
* React Router
* Axios
* Recharts
* Framer Motion
* JWT Authentication
* Render Deployment

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Token Management
* Auto Logout on Unauthorized Access
* Role-Based UI Rendering

### Dashboard

* Total Income Overview
* Total Expense Overview
* Current Balance Tracking
* Recent Transaction History
* Financial Summary Cards

### Transaction Management

* Add New Transactions
* Update Existing Transactions
* Delete Transactions
* Search Transactions
* Filter Records
* Pagination Support

### Analytics

* Category-wise Expense Analysis
* Monthly Spending Trends
* Income vs Expense Comparison
* Interactive Charts & Graphs

### Admin Features

* User Role Management
* Access Control for Protected Pages
* Role-Based Navigation

### User Experience

* Responsive Design
* Dark Theme UI
* Loading Skeletons
* Animated Components
* Mobile-Friendly Layout

---

## Pages

### Authentication

* Login Page
* Signup Page

### Main Application

* Dashboard
* Transactions
* Analytics
* Settings

### Admin

* Admin Management Page

---

## Project Structure

```text
src
│
├── animations          # UI animations and motion effects
├── api                 # API configuration and requests
├── components          # Reusable UI components
├── constants           # Application constants
├── context             # Global state management
├── hooks               # Custom React hooks
├── layouts             # Layout components
├── pages               # Application pages/screens
├── routes              # Route definitions and protection
├── services            # Business logic and API services
├── utils               # Utility/helper functions
│
├── App.jsx
├── main.jsx
└── index.css
```


---

## Backend Integration

This frontend consumes APIs from the Finance Backend RBAC System.

Backend Repository:

https://github.com/Yugraj08/finance-backend-rbac

Backend Live API:

https://finance-backend-rbac.onrender.com

---

## AI Financial Assistant

The application includes support for an AI-powered financial assistant.

Users can:

* Ask questions about their finances
* Understand spending patterns
* Get budgeting suggestions
* Receive financial insights
* Analyze transaction behavior

Example Questions:

* "What category am I spending the most on?"
* "How can I reduce my monthly expenses?"
* "Summarize my spending this month."
* "Give me budgeting recommendations."

---

## Deployment

Live Application

<https://ai-financial-analytics-platform-fro.vercel.app/login>

---

## Run Locally

Clone the project

```bash
git clone https://github.com/Yugraj08/<frontend-repository-name>.git
```

Go to project directory

```bash
cd <Ai-financial-analytics-platform-Frontend>
```

Install dependencies

```bash
npm install
```

Configure Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8081
```

Start development server

```bash
npm run dev
```

Build production version

```bash
npm run build
```

---

## Environment Variables

Create a `.env` file and add:

```env
VITE_API_BASE_URL=https://finance-backend-rbac.onrender.com
```

---

## Screenshots

### Login Page

<img width="1920" height="965" alt="login" src="https://github.com/user-attachments/assets/64478661-908e-4bb7-acc4-9222f49d9888" />


### Dashboard

<img width="1917" height="966" alt="dashboard" src="https://github.com/user-attachments/assets/10c8cc43-f7c3-4ded-ae1a-a47f593ec26d" />


### AI Assistant

<img width="1917" height="967" alt="ai " src="https://github.com/user-attachments/assets/e2874ff4-0bf4-4030-8753-18a27477ae19" />


### Transactions

<img width="1920" height="974" alt="transaction" src="https://github.com/user-attachments/assets/875ca28a-0c84-4eb9-b360-7e840148e19f" />


### Analytics

<img width="1917" height="966" alt="analytics" src="https://github.com/user-attachments/assets/e85c9c40-d5ef-42cc-b716-9cf04468d38c" />


---

## Future Improvements

* Budget Planning Module
* Financial Goal Tracking
* CSV/PDF Export
* Multi-Currency Support
* Advanced AI Recommendations
* Notification System

---

## Notes

* Frontend communicates with the backend using secured JWT authentication.
* Unauthorized requests automatically redirect users to the login page.
* Charts are powered using Recharts.
* Render free-tier deployments may take a few seconds to wake up after inactivity.
