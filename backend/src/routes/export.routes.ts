import { Router } from 'express';
import { exportHTML } from '../controllers/export.controller';

const router = Router();

// POST /api/export/html - Export optimized HTML
router.post('/html', exportHTML);

export default router;
