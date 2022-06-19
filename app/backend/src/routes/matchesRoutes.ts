import { Router } from 'express';
import MatchesControllers from '../controllers/MatchesControllers';

const routes = Router();
const matchesControllers = new MatchesControllers();

const { getAll } = matchesControllers;

routes.get('/matches', getAll);

export default routes;
