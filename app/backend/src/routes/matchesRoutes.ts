import { Router } from 'express';
import MatchesControllers from '../controllers/MatchesControllers';

const routes = Router();
const matchesControllers = new MatchesControllers();

const { getAll, getAllByProgress } = matchesControllers;

routes.get('/matches', getAllByProgress, getAll);

export default routes;
