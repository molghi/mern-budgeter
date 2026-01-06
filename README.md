# Your Budget — Tracker & Planner

A personal **budget tracker and planner** built with the **MERN stack** and **Tailwind CSS**.  
Designed to track daily finances, summarize monthly activity, and plan future balances across multiple months.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT (httpOnly cookies)

---

## Core Features

### Authentication

- User signup, login, logout
- Auth-protected routes
- Persistent session via cookies
- Username stored and synced on auth actions

---

### Tracker

- Create, read, update, delete entries
- Filter entries by month and year
- Auto-generated entries table
- Monthly summary: Total income, Total expense, Interactive summary chart
- Loading indicators and flash messages
- Data refetch on all mutations
- Mobile-friendly layout

---

### Planner

- Displays 3–4 upcoming months
- Calendar-style month view: Past days grayed out, Event days highlighted
- Per-month tables with planned entries
- Click once to edit, double-click to delete
- Sequential balance calculations across months
- Current balance management
- Conditional add/edit forms
- Loading spinner support
- Planner state persisted

---

### User Preferences

- Change username
- Set week start (Monday / Sunday)
- Change currency sign
- Preferences persisted
- Last selected view (Tracker / Planner) remembered

---

## UX & Reliability

- Flash messages for all actions
- Loading states everywhere needed
- Mobile layout, responsive design
- Code commented (frontend & backend)
