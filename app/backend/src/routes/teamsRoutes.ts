import { Router } from 'express';
import TeamsControllers from '../controllers/TeamsControllers';

const routes = Router();
const teamsControllers = new TeamsControllers();

const { getAll } = teamsControllers;

routes.get('/teams', getAll);

export default routes;
