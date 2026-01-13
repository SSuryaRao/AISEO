# Quick Start Guide

## ✅ Setup Complete!

Your AI SEO Optimizer is now ready to use. Both frontend and backend are running:

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Health**: http://localhost:5000/health

## 🚀 Servers Status

### Backend (Port 5000) ✅
- Express.js server running
- API endpoints active
- Gemini API key configured
- CORS enabled for frontend

### Frontend (Port 3000) ✅
- Next.js app running
- Connected to backend API
- Three-panel layout ready
- URL input functional

## 📋 How to Use

1. **Open the app**: Visit http://localhost:3000

2. **Enter a blog URL**:
   - Try any blog URL (e.g., https://example.com/blog-post)
   - Currently using mock data (real fetching in Phase 2)

3. **View the three panels**:
   - **Left**: Original blog content
   - **Middle**: Editor (TipTap integration coming in Phase 3)
   - **Right**: Preview with meta tags and schema

## 🛠️ API Endpoints Available

### Blog Fetching
```bash
POST http://localhost:5000/api/blog/fetch
Body: { "url": "https://example.com/blog" }
```

### SEO Optimization (stub)
```bash
POST http://localhost:5000/api/seo/optimize
Body: { "content": "...", "metadata": {...} }
```

### HTML Export (stub)
```bash
POST http://localhost:5000/api/export/html
Body: { "content": "...", "metadata": {...}, "schemas": [...] }
```

## 🔧 If Servers Stopped

### Restart Both Servers
```bash
npm run dev
```

### Or Restart Individually
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 📝 Current Status

**Phase 1: Foundation** ✅ COMPLETE
- Project structure
- Frontend & backend separation
- Basic UI components
- State management
- API routing

**Phase 2: Content Fetching** 🚧 NEXT
- Implement real blog parsing with Cheerio
- Add platform detection (WordPress, Medium, etc.)
- Use Mozilla Readability for fallback
- Extract metadata and content structure

## 🎯 Next Development Steps

1. **Implement Blog Parser** (Phase 2)
   - `backend/src/services/blog-parser.service.ts`
   - `backend/src/utils/platform-detector.ts`
   - Integration with Cheerio and Readability

2. **Add TipTap Editor** (Phase 3)
   - WYSIWYG editor in middle panel
   - Custom SEO extensions
   - Real-time preview sync

3. **Integrate Gemini AI** (Phase 4)
   - SEO optimization prompts
   - AI-powered suggestions
   - Content analysis

## 📚 Resources

- Main README: `README.md`
- Frontend README: `frontend/README.md`
- Backend README: `backend/README.md`
- Implementation Plan: `.claude/plans/robust-discovering-aurora.md`

## 🐛 Troubleshooting

**Port Already in Use?**
- Change `PORT` in `backend/.env`
- Update `NEXT_PUBLIC_API_URL` in `frontend/.env.local`

**CORS Errors?**
- Verify `FRONTEND_URL` in `backend/.env` matches frontend URL
- Default is `http://localhost:3000`

**API Not Responding?**
- Check backend server is running: http://localhost:5000/health
- Should return: `{"status":"ok","message":"AI SEO Backend is running"}`

---

**Ready to start developing!** 🎉

Your Gemini API key is configured and both servers are connected.
Visit http://localhost:3000 to see your app in action!
