import { Router } from 'express';
import JwtMiddlewares from '../middlewares/JwtMiddlewares';
import MatchesControllers from '../controllers/MatchesControllers';

const routes = Router();
const jwtMiddlewares = new JwtMiddlewares();
const matchesControllers = new MatchesControllers();

const { checkToken } = jwtMiddlewares;
const { create, getAll, getAllByProgress } = matchesControllers;

routes.get('/matches', getAllByProgress, getAll);
routes.post('/matches', checkToken, create);

export default routes;
