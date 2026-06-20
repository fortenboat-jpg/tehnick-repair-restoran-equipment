# Forten Commercial Equipment Services

Next.js App Router platform for **Forten Commercial Equipment Services**.

Brand: navy blue, orange, white  
Tagline: Commercial Kitchen Equipment Repair & Maintenance

## Modules

- Public bilingual RU/EN website at `/`
- Website lead form with local CRM storage and `/api/lead` submission
- Telegram notification support for new website leads
- CRM dashboard at `/crm`
- Leads, customers, equipment history, smart estimates, work orders, invoices, marketing, and settings
- Future Google Places lead collector placeholder at `/crm/lead-collector`
- Branded PDF estimate download with RU/EN estimate content

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Vercel

- Framework: Next.js
- Root Directory: `./`
- Custom server: not required
- Keep this project connected to the existing Vercel project. Do not create a second Vercel project.

## Environment Variables

Required only for Telegram notifications:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

The app still works when these variables are missing. Leads are stored in browser `localStorage` for the MVP.

Planned for the future lead collector:

```env
GOOGLE_PLACES_API_KEY=
```

## MVP Data Model

This MVP uses browser `localStorage` keys:

- `fortenLeads`
- `fortenCustomers`
- `fortenWorkOrders`
- `fortenInvoices`

These can later be replaced with a database without changing the public route structure.
