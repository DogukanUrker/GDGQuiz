# GDGQuiz

**Live Demo:** [https://gdg-quiz-2025.vercel.app/](https://gdg-quiz-2025.vercel.app/)

## Setup

Create `.env.local`:

```env
MONGODB_URI=your_mongodb_connection_string_here
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password_here
```

**Get MongoDB URI:**

- Free: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) → Create Cluster → Connect → Connection String
- Local: `mongodb://localhost:27017/gdgquiz`

**Admin Password:** Choose any password for `/admin` access

## Run

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
bun build
bun start
```
