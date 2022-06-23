import TeamsServices from './TeamsServices';
import MatchesServices from './MatchesServices';
import { IMatch } from '../interfaces/MatchesInterfaces';

class LeaderboardServices {
  private matchesServices: MatchesServices;
  private teamsServices: TeamsServices;

  constructor() {
    this.matchesServices = new MatchesServices();
    this.teamsServices = new TeamsServices();
  }

  private calcTotalPoints = async (teamId: number, match: IMatch) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    let points = 0;

    if (teamId === homeTeam && homeTeamGoals > awayTeamGoals) {
      points += 3;
    } else if (teamId === awayTeam && homeTeamGoals < awayTeamGoals) {
      points += 3;
    } else {
      points += 1;
    }

    return points;
  };

  public getAll = async () => {
    const matches = await this.matchesServices.getAll();
    const teams = await this.teamsServices.getAll();

    const leaderboards = matches.map((match, index) => {
      const { teamName, id } = teams[index];

      return {
        name: teamName,
        totalPoints: this.calcTotalPoints(id, match),
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
