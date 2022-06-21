import { Router } from 'express';
import JwtMiddlewares from '../middlewares/JwtMiddlewares';
import MatchesControllers from '../controllers/MatchesControllers';
import MatchesMiddlewares from '../middlewares/MatchesMiddlewares';

const routes = Router();
const jwtMiddlewares = new JwtMiddlewares();
const matchesControllers = new MatchesControllers();
const matchesMiddlewares = new MatchesMiddlewares();

const { checkToken } = jwtMiddlewares;
const { checkEqualTeams, checkTeamsExist } = matchesMiddlewares;
const { getAll, getAllByProgress, finish, start, update } = matchesControllers;

routes.get('/matches', getAllByProgress, getAll);
routes.post('/matches', checkToken, checkTeamsExist, checkEqualTeams, start);
routes.patch('/matches/:id', update);
routes.patch('/matches/:id/finish', finish);

export default routes;
