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

  private calcGoalsBalance = async (teamId: number, matches: IMatch[]) => {
    const goalsFavor = await this.calcGoalsFavor(teamId, matches);
    const calcGoalsOwn = await this.calcGoalsOwn(teamId, matches);

    return goalsFavor - calcGoalsOwn;
  };

  private calcGoalsFavor = async (teamId: number, matches: IMatch[]) => {
    let goals = 0;

    matches.forEach((match) => {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = match;

      if (inProgress === false) {
        if (teamId === homeTeam) {
          goals += homeTeamGoals;
        } else if (teamId === awayTeam) {
          goals += awayTeamGoals;
        }
      }
    });

    return goals;
  };

  private calcGoalsOwn = async (teamId: number, matches: IMatch[]) => {
    let goals = 0;

    matches.forEach((match) => {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = match;

      if (inProgress === false) {
        if (teamId === homeTeam) {
          goals += awayTeamGoals;
        } else if (teamId === awayTeam) {
          goals += homeTeamGoals;
        }
      }
    });

    return goals;
  };

  public calcTeamUsage = async (teamId: number, matches: IMatch[]) => {
    const totalPoints = await this.calcTotalPoints(teamId, matches);
    const totalGames = await this.calcTotalGames(teamId, matches);
    const teamUsage = ((totalPoints / (totalGames * 3)) * 100);
    return (teamUsage).toFixed(2);
  };

  private calcTotalDraws = async (teamId: number, matches: IMatch[]) => {
    let draws = 0;

    matches.forEach((match) => {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = match;
      const isPresent = teamId === homeTeam || teamId === awayTeam;

      if (inProgress === false && isPresent && homeTeamGoals === awayTeamGoals) {
        draws += 1;
      }
    });

    return draws;
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

  private calcTotalLosses = async (teamId: number, matches: IMatch[]) => {
    let losses = 0;

    matches.forEach((match) => {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = match;
      const homeTeamLose = teamId === homeTeam && homeTeamGoals < awayTeamGoals;
      const awayTeamLose = teamId === awayTeam && homeTeamGoals > awayTeamGoals;

      if (inProgress === false && (homeTeamLose || awayTeamLose)) {
        losses += 1;
      }
    });

    return losses;
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

  private calcTotalWins = async (teamId: number, matches: IMatch[]) => {
    let wins = 0;

    matches.forEach((match) => {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = match;
      const homeTeamWin = teamId === homeTeam && homeTeamGoals > awayTeamGoals;
      const awayTeamWin = teamId === awayTeam && homeTeamGoals < awayTeamGoals;

      if (inProgress === false && (homeTeamWin || awayTeamWin)) {
        wins += 1;
      }
    });

    return wins;
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
        totalVictories: this.calcTotalWins(id, matches),
        totalDraws: this.calcTotalDraws(id, matches),
        totalLosses: this.calcTotalLosses(id, matches),
        goalsFavor: this.calcGoalsFavor(id, matches),
        goalsOwn: this.calcGoalsOwn(id, matches),
        goalsBalance: this.calcGoalsBalance(id, matches),
        efficiency: this.calcTeamUsage(id, matches),
      };
    });
  };
}

export default LeaderboardServices;
