import { Request, Response } from 'express';
import UsersService from '../services/users.services';

class UsersControllers {
  private service: UsersService;

  constructor() {
    this.service = new UsersService();
  }

  public loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;
    const user = await this.service.loginUser(email);
    return res.status(200).json(user);
  };
}

export default UsersControllers;
