import { Request, Response } from 'express';
import JwtServices from '../services/jwt.services';
import UsersServices from '../services/users.services';
import { IUserToken } from '../interfaces/UsersInterfaces';

class UsersControllers {
  private usersServices: UsersServices;
  private jwtServices: JwtServices;

  constructor() {
    this.usersServices = new UsersServices();
    this.jwtServices = new JwtServices();
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const user = await this.usersServices.login(email, password);
    return res.status(200).json(user);
  };

  public loginValidate = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization;
    const { data: { role } } = this.jwtServices.decoder(token as string) as IUserToken;

    return res.status(200).json(role);
  };
}

export default UsersControllers;
