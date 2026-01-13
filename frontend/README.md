# Frontend - AI SEO Optimizer

Next.js 14 frontend application for the AI SEO Optimizer.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- TipTap (WYSIWYG Editor)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Main page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── layout/       # Layout components
│   │   ├── editor/       # Editor components
│   │   ├── input/        # Input components
│   │   ├── preview/      # Preview components
│   │   ├── seo/          # SEO components
│   │   └── export/       # Export components
│   ├── store/            # Zustand store
│   ├── types/            # TypeScript types
│   └── hooks/            # Custom React hooks
├── public/               # Static files
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features

- Three-panel layout (Original, Editor, Preview)
- URL input and blog fetching
- WYSIWYG editor integration (TipTap)
- Real-time preview
- SEO suggestions display
- Schema markup visualization
- HTML export

## State Management

Uses Zustand for lightweight state management:

```typescript
import { useStore } from '@/store/useStore';

function Component() {
  const { originalBlog, setOriginalBlog } = useStore();
  // ...
}
```

## Connecting to Backend

The frontend connects to the backend API using environment variables:

```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const response = await fetch(`${apiUrl}/api/blog/fetch`, {
  method: 'POST',
  body: JSON.stringify({ url }),
});
```
