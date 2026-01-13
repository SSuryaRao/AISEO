# Backend - AI SEO Optimizer

Express.js + TypeScript backend API for the AI SEO Optimizer.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Google Gemini AI
- Cheerio (HTML Parsing)
- JSDOM + Mozilla Readability

## Getting Started

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create `.env` file:

```env
PORT=5000
NODE_ENV=development
GOOGLE_GEMINI_API_KEY=your_api_key_here
FRONTEND_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

Server will start at [http://localhost:5000](http://localhost:5000)

## Project Structure

```
backend/
├── src/
│   ├── server.ts              # Express server setup
│   ├── routes/                # API routes
│   │   ├── blog.routes.ts     # Blog fetching routes
│   │   ├── seo.routes.ts      # SEO optimization routes
│   │   └── export.routes.ts   # HTML export routes
│   ├── controllers/           # Route controllers
│   │   ├── blog.controller.ts
│   │   ├── seo.controller.ts
│   │   └── export.controller.ts
│   ├── services/              # Business logic (to be added)
│   ├── utils/                 # Utility functions (to be added)
│   └── types/                 # TypeScript types (to be added)
├── dist/                      # Compiled JavaScript
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

### Health Check
```
GET /health
```

### Blog Fetching
```
POST /api/blog/fetch
Body: { url: string }
```

### SEO Optimization
```
POST /api/seo/optimize
Body: { content: string, metadata: object }
```

### HTML Export
```
POST /api/export/html
Body: { content: string, metadata: object, schemas: array }
```

## CORS Configuration

The backend is configured to accept requests from the frontend URL specified in `.env`:

```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
```

## Google Gemini Integration

To use Google Gemini AI:

1. Get API key from https://makersuite.google.com/app/apikey
2. Add to `.env` file
3. Implementation coming in Phase 4

## Development

The backend uses `ts-node-dev` for hot reloading during development. Any changes to TypeScript files will automatically restart the server.

## Production Build

```bash
npm run build
npm start
```

This compiles TypeScript to JavaScript in the `dist/` folder and runs the compiled code.
