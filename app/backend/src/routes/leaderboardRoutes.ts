import { Router } from 'express';
import LeaderboardControllers from '../controllers/LeaderboardControllers';

const routes = Router();
const leaderboardControllers = new LeaderboardControllers();

const { getAll } = leaderboardControllers;

routes.get('/leaderboard/home', getAll);

export default routes;
