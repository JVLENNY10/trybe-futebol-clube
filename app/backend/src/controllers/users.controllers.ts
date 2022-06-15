import { Request, Response } from 'express';
import UsersService from '../services/users.services';

class UsersControllers {
  private service: UsersService;

  constructor() {
    this.service = new UsersService();
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const user = await this.service.login(email, password);
    return res.status(200).json(user);
  };
}

export default UsersControllers;
