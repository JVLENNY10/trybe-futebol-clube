import { Request, Response, NextFunction } from 'express';
import TeamsServices from '../services/TeamsServices';

class MatchesMiddlewares {
  private teamsServices: TeamsServices;

  constructor() {
    this.teamsServices = new TeamsServices();
  }

  public checkEqualTeams = (
    async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
      const { homeTeam, awayTeam } = req.body;

      if (homeTeam === awayTeam) {
        return res.status(401).json({
          message: 'It is not possible to create a match with two equal teams',
        });
      }

      next();
    }
  );

  public checkTeamsExist = (
    async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
      const { homeTeam, awayTeam } = req.body;
      const homeTeamExists = await this.teamsServices.getById(homeTeam);
      const awayTeamExists = await this.teamsServices.getById(awayTeam);

      if (homeTeamExists === null || awayTeamExists === null) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }

      next();
    }
  );
}

export default MatchesMiddlewares;
