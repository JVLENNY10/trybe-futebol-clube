import { Request, Response } from 'express';
import LeaderboardServices from '../services/LeaderboardServices';

class LeaderboardControllers {
  private services: LeaderboardServices;

  constructor() {
    this.services = new LeaderboardServices();
  }

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const { path } = req;
    const leaderboard = await this.services.getAllAndReverseSort(path);

    return res.status(200).json(leaderboard);
  };
}

export default LeaderboardControllers;
