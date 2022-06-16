import { Request, Response, NextFunction } from 'express';
import UsersServices from '../services/users.services';

class UsersMiddlewares {
  private services: UsersServices;

  constructor() {
    this.services = new UsersServices();
  }

  public checkBody = (
    async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
      const { email, password } = req.body;

      if (email.length === 0 || password.length === 0) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }

      next();
    }
  );

  public checkLogin = (
    async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
      const { email, password } = req.body;
      const login = await this.services.login(email, password);

      if (!login) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }

      next();
    }
  );
}

export default UsersMiddlewares;
