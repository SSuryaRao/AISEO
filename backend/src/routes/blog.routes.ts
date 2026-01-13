import { Router } from 'express';
import { fetchBlog } from '../controllers/blog.controller';

const router = Router();

// POST /api/blog/fetch - Fetch and parse blog from URL
router.post('/fetch', fetchBlog);

export default router;
