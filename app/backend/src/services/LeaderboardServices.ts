import MatchesServices from './MatchesServices';
import TeamsServices from './TeamsServices';

class LeaderboardServices {
  private matchesServices: MatchesServices;
  private teamsServices: TeamsServices;

  constructor() {
    this.matchesServices = new MatchesServices();
    this.teamsServices = new TeamsServices();
  }

  public getAll = async () => {
    const matches = await this.matchesServices.getAll();
    const teams = await this.teamsServices.getAll();

    const leaderboards = matches.map((_match, index) => {
      const { teamName } = teams[index];

      return {
        name: teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      };
    });

    return leaderboards;
  };
}

export default LeaderboardServices;
