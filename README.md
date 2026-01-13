# AI SEO Optimizer

An AI-powered tool to optimize blog content for AI chatbots like ChatGPT and Perplexity. Uses Google Gemini AI to analyze and improve SEO with schema markup, meta tags, and content optimization.

## Project Structure

```
AISEO/
├── frontend/          # Next.js 14 + TypeScript frontend
├── backend/           # Express.js + TypeScript backend
└── README.md          # This file
```

## Features

- **AI-Powered Optimization**: Uses Google Gemini AI for intelligent SEO suggestions
- **Schema Markup**: Generates Article, FAQ, and HowTo JSON-LD schemas
- **Meta Tags**: Optimizes title, description, OpenGraph, and Twitter Cards
- **Content Analysis**: Improves readability, heading structure, and keyword optimization
- **Live Preview**: Three-panel interface with original, editor, and preview
- **HTML Export**: Export optimized content ready for publishing

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- TipTap (WYSIWYG Editor)
- Zustand (State Management)
- Tailwind CSS

### Backend
- Node.js + Express
- TypeScript
- Google Gemini AI
- Cheerio (HTML Parsing)
- Mozilla Readability (Content Extraction)

## Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Google Gemini API key

## Quick Start

### 1. Clone and Install

```bash
# Install dependencies for both frontend and backend
npm install
```

### 2. Setup Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
GOOGLE_GEMINI_API_KEY=your_api_key_here
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Run the Application

```bash
# Start both frontend and backend
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/health

## Usage

1. Enter a blog URL in the input field
2. Click "Analyze Blog" to fetch and parse the content
3. View original content in the left panel
4. Edit and optimize in the middle panel
5. See live preview and SEO data in the right panel
6. Click "Optimize with AI" to get AI-powered suggestions
7. Export the optimized HTML when ready

## Development Roadmap

### Phase 1: Foundation ✅
- [x] Project structure setup
- [x] Frontend and backend separation
- [x] Basic three-panel UI
- [x] State management

### Phase 2: Content Fetching (In Progress)
- [ ] Blog URL fetcher implementation
- [ ] Platform-specific parsers (WordPress, Medium, Ghost)
- [ ] Content extraction with Cheerio
- [ ] Metadata extraction

### Phase 3: Editor Integration
- [ ] TipTap WYSIWYG editor
- [ ] Custom SEO extensions
- [ ] Real-time preview sync
- [ ] Toolbar and formatting controls

### Phase 4: Gemini AI Integration
- [ ] Google Gemini API client
- [ ] SEO optimization prompts
- [ ] AI suggestions UI
- [ ] Apply suggestions functionality

### Phase 5: Schema Markup & Meta Tags
- [ ] Article schema generator
- [ ] FAQ schema generator
- [ ] HowTo schema generator
- [ ] Meta tags optimization
- [ ] Schema viewer and editor

### Phase 6: Export Functionality
- [ ] HTML export generator
- [ ] Multiple export formats
- [ ] WordPress-ready export
- [ ] Markdown export (optional)

### Phase 7: Polish & Optimization
- [ ] Responsive design
- [ ] Error handling
- [ ] Performance optimization
- [ ] Testing and bug fixes

## API Endpoints

### Blog
- `POST /api/blog/fetch` - Fetch and parse blog from URL

### SEO
- `POST /api/seo/optimize` - Optimize content with Gemini AI

### Export
- `POST /api/export/html` - Export optimized HTML

## Contributing

This is a personal project. Feel free to fork and modify for your own use.

## License

MIT

## Getting Your Gemini API Key

1. Visit https://makersuite.google.com/app/apikey
2. Create a new API key
3. Add it to `backend/.env` file

## Troubleshooting

### Port Already in Use

If port 3000 or 5000 is already in use:

```bash
# Change PORT in backend/.env
PORT=5001

# Update NEXT_PUBLIC_API_URL in frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### CORS Errors

Make sure the backend `FRONTEND_URL` matches your frontend URL.

## Support

For issues or questions, please create an issue on GitHub.
