import Team from '../database/models/Team';
import { ITeamsFunctions, ITeam } from '../interfaces/TeamsInterfaces';

class TeamsServices implements ITeamsFunctions {
  public getAll = async (): Promise<ITeam[]> => {
    const teams = await Team.findAll();
    return teams as ITeam[];
  };
}

export default TeamsServices;
