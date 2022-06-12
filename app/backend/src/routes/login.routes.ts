import { Router } from 'express';
import UsersControllers from '../controllers/users.controllers';
import UsersMiddlewares from '../middlewares/users.middlewares';

const routes = Router();
const usersControllers = new UsersControllers();
const usersMiddlewares = new UsersMiddlewares();

const { loginUser } = usersControllers;
const { checkEmail, checkPassword } = usersMiddlewares;

routes.get('/login', checkEmail, checkPassword, loginUser);

export default routes;
