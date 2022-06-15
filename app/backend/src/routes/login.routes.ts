import { Router } from 'express';
import UsersControllers from '../controllers/users.controllers';
import UsersMiddlewares from '../middlewares/users.middlewares';

const routes = Router();
const usersControllers = new UsersControllers();
const usersMiddlewares = new UsersMiddlewares();

const { login } = usersControllers;
const { checkEmail, checkPassword } = usersMiddlewares;

routes.post('/login', checkEmail, checkPassword, login);

export default routes;
