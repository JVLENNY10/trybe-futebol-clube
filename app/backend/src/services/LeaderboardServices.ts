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

  private calculateTotalDraws = async (teamId: number, matches: IMatch[]) => {
    let totalDraws = 0;

    matches.forEach((match) => {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = match;
      const isPresent = teamId === homeTeam || teamId === awayTeam;

      if (inProgress === false && isPresent && homeTeamGoals === awayTeamGoals) {
        totalDraws += 1;
      }
    });

    return totalDraws;
  };

  private calcTotalGames = async (teamId: number, matches: IMatch[]) => {
    let games = 0;

    matches.forEach((match) => {
      const { homeTeam, awayTeam, inProgress } = match;
      const isPresent = teamId === homeTeam || teamId === awayTeam;

      if (inProgress === false && isPresent) {
        games += 1;
      }
    });

    return games;
  };

  private calcTotalPoints = async (teamId: number, matches: IMatch[]) => {
    let points = 0;

    matches.forEach((match) => {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = match;
      const homeTeamWin = teamId === homeTeam && homeTeamGoals > awayTeamGoals;
      const awayTeamWin = teamId === awayTeam && homeTeamGoals < awayTeamGoals;

      if (inProgress === false) {
        if (homeTeamWin || awayTeamWin) {
          points += 3;
        } else {
          points += 1;
        }
      }
    });

    return points;
  };

  private calculateTotalWins = async (teamId: number, matches: IMatch[]) => {
    let totalWins = 0;

    matches.forEach((match) => {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = match;
      const homeTeamWin = teamId === homeTeam && homeTeamGoals > awayTeamGoals;
      const awayTeamWin = teamId === awayTeam && homeTeamGoals < awayTeamGoals;

      if (inProgress === false && (homeTeamWin || awayTeamWin)) {
        totalWins += 1;
      }
    });

    return totalWins;
  };

  public getAll = async () => {
    const matches = await this.matchesServices.getAll();
    const teams = await this.teamsServices.getAll();

    return teams.map((team) => {
      const { teamName, id } = team;

      return {
        name: teamName,
        totalPoints: this.calcTotalPoints(id, matches),
        totalGames: this.calcTotalGames(id, matches),
        totalVictories: this.calculateTotalWins(id, matches),
        totalDraws: this.calculateTotalDraws(id, matches),
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      };
    });
  };
}

export default LeaderboardServices;
