import express from 'express';
import { IRacingService } from '../services/iRacingService.js';

const router = express.Router();
const iRacing = new IRacingService();

router.get('/driver/:custId', async (req, res) => {
  try {
    const stats = await iRacing.getDriverStats(req.params.custId);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/driver/:custId/recent-races', async (req, res) => {
  try {
    const races = await iRacing.getRecentRaces(req.params.custId);
    res.json(races);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;