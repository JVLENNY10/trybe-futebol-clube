import { Request, Response } from 'express';
import MatchesServices from '../services/MatchesServices';

class MatchesControllers {
  private services: MatchesServices;

  constructor() {
    this.services = new MatchesServices();
  }

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const Matches = await this.services.getAll();
    return res.status(200).json(Matches);
  };
}

export default MatchesControllers;
