# Karter CRM

A CRM for a services company — construction, repairs and maintenance. Built as a portfolio
project: it runs entirely in the browser, needs no backend, and ships with a realistic Romanian
demo dataset so the app looks alive the moment it opens.

## Features

- **Dashboard** — revenue, pipeline value, conversion rate and overdue invoices, plus a six-month
  revenue chart, a sales funnel, lead sources, per-agent performance, today's agenda and a recent
  activity feed.
- **Clients** — searchable and sortable list with per-client detail pages (leads, conversations,
  notes, tasks and documents in tabs).
- **Leads** — table view with filters by stage, owner and free text, sortable by value,
  probability and expected close date.
- **Pipeline** — drag-and-drop kanban across the four stages (Nou → Contactat → Ofertă → Câștigat),
  with a separate table for lost leads and their reasons.
- **Tasks** — mine / all / completed, with priorities, due dates, overdue highlighting and links to
  the related client and lead.
- **Calendar** — month grid with a day panel, five appointment types, attendees and locations.
- **Notes** — pinnable notes, either general or attached to a client.
- **Conversation history** — every call, email, WhatsApp message and meeting, grouped by day and
  marked inbound or outbound.
- **Quotes and invoices** — line items, VAT, totals, status workflow and a printable document view.
- **Users and roles** — three roles (administrator, manager, sales agent) with a visible permission
  matrix. Switch the active user from the sidebar to see the UI change per role.
- **Light and dark themes**, with the choice remembered per browser.

All iconography and every chart are hand-drawn inline SVG — no icon font, no emoji, no charting
library.

## Tech

React 18, TypeScript, Vite, React Router. State lives in a single reducer and is persisted to
`localStorage`; there is no server and no network call at runtime.

## Running it

```bash
npm install
npm run dev      # development server
npm run build    # production build into dist/
npm run preview  # serve the production build
```

The app uses `HashRouter` and a relative `base`, so the contents of `dist/` can be dropped onto any
static host (GitHub Pages, Netlify, Vercel) without rewrite rules.

## Project layout

```
src/
  components/   layout, shared UI primitives, icon set, charts, lead form
  data/seed.ts  demo dataset, generated relative to today's date
  lib/          Romanian formatting helpers and id generation
  pages/        one file per screen
  store/        reducer + localStorage persistence, theme context
  styles/       design tokens and the whole stylesheet
  types.ts      domain model, roles and permissions
```

## Demo data

The seed is regenerated relative to the current date, so overdue tasks stay overdue and the
calendar always has something in this week. **Settings → Reset demo data** restores the original
dataset at any time.
