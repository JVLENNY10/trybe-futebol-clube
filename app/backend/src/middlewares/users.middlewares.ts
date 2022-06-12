import { Request, Response, NextFunction } from 'express';

class UsersMiddlewares {
  public checkEmail = (
    async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
      const { email } = req.body;

      if (!email.includes('@') || !email.includes('.com')) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }

      if (email === undefined) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }

      next();
    }
  );

  public checkPassword = (
    async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
      const { password } = req.body;

      if (password.length <= 6) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }

      if (password === undefined) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }

      next();
    }
  );
}

export default UsersMiddlewares;
