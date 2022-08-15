import { Request, Response } from 'express';
import JwtHelpers from '../helpers/JwtHelpers';
import UsersServices from '../services/UsersServices';
import { IUserToken } from '../interfaces/UsersInterfaces';

class UsersControllers {
  private usersServices: UsersServices;
  private jwtHelpers: JwtHelpers;

  constructor() {
    this.usersServices = new UsersServices();
    this.jwtHelpers = new JwtHelpers();
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const user = await this.usersServices.login(email, password);
    return res.status(200).json(user);
  };

  public loginValidate = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization;
    const { data: { role } } = this.jwtHelpers.decoder(token as string) as IUserToken;
    return res.status(200).json(role);
  };
}

export default UsersControllers;
