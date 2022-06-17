import { Request, Response } from 'express';
import TeamsServices from '../services/TeamsServices';

class TeamsControllers {
  private services: TeamsServices;

  constructor() {
    this.services = new TeamsServices();
  }

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const teams = await this.services.getAll();
    return res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const team = await this.services.getById(id);
    return res.status(200).json(team);
  };
}

export default TeamsControllers;
