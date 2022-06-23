import TeamsServices from './TeamsServices';

class LeaderboardServices {
  private teamsServices: TeamsServices;

  constructor() {
    this.teamsServices = new TeamsServices();
  }

  private teamsList = async () => {
    const teams = await this.teamsServices.getAll();
    const teamsIds = teams.filter((team) => team.id);
    return teamsIds;
  };
}

export default LeaderboardServices;
