import { Request, Response, NextFunction } from 'express';
import MatchesServices from '../services/MatchesServices';

class MatchesControllers {
  private services: MatchesServices;

  constructor() {
    this.services = new MatchesServices();
  }

  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    const matches = await this.services.getAll();
    return res.status(200).json(matches);
  };

  public getAllByProgress = (
    async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
      const { inProgress } = req.query;

      if (inProgress !== undefined) {
        const matches = await this.services.getAllByProgress(inProgress as string);
        return res.status(200).json(matches);
      }

      next();
    }
  );
}

export default MatchesControllers;
