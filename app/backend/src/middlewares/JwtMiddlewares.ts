import { Request, Response, NextFunction } from 'express';

class JwtMiddlewares {
  public checkToken = (
    async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
      const token = req.headers.authorization;

      if (token === undefined) {
        return res.status(401).json({ message: 'Token not found' });
      }

      next();
    }
  );
}

export default JwtMiddlewares;
