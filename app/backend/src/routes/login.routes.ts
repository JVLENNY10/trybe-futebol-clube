import { Router } from 'express';
import UsersControllers from '../controllers/users.controllers';
import UsersMiddlewares from '../middlewares/users.middlewares';

const routes = Router();
const usersControllers = new UsersControllers();
const usersMiddlewares = new UsersMiddlewares();

const { login } = usersControllers;
const { checkBody, checkLogin } = usersMiddlewares;

routes.post('/login', checkBody, checkLogin, login);

export default routes;
