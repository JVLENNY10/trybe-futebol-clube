import { Router } from 'express';
import TeamsControllers from '../controllers/TeamsControllers';

const routes = Router();
const teamsControllers = new TeamsControllers();

const { getAll, getById } = teamsControllers;

routes.get('/teams', getAll);
routes.get('/teams/:id', getById);

export default routes;
