import express from 'express';
import { getAllDatabaseStats } from '../controllers/statsController.js';

const statsRouter = express.Router();

statsRouter.get('/get-stats', getAllDatabaseStats);

export default statsRouter;