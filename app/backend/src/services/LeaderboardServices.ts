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

  private calcGoalsBalance = (newMatches: IMatch[]) => {
    const goalsFavor = this.calcGoalsFavor(newMatches);
    const calcGoalsOwn = this.calcGoalsOwn(newMatches);

    return goalsFavor - calcGoalsOwn;
  };

  private calcGoalsFavor = (newMatches: IMatch[]) => {
    let goals = 0;

    newMatches.forEach((match) => {
      const { homeTeamGoals, inProgress } = match;

      if (inProgress === false && homeTeamGoals) {
        goals += homeTeamGoals;
      }
    });

    return goals;
  };

  private calcGoalsOwn = (newMatches: IMatch[]) => {
    let goals = 0;

    newMatches.forEach((match) => {
      const { awayTeamGoals, inProgress } = match;

      if (inProgress === false && awayTeamGoals) {
        goals += awayTeamGoals;
      }
    });

    return goals;
  };

  public calcTeamUsage = (newMatches: IMatch[]) => {
    const totalPoints = this.calcTotalPoints(newMatches);
    const totalGames = this.calcTotalGames(newMatches);
    const teamUsage = (totalPoints / (totalGames * 3)) * 100;
    return Number(teamUsage.toFixed(2));
  };

  private calcTotalDraws = (newMatches: IMatch[]) => {
    let draws = 0;

    newMatches.forEach((match) => {
      const { homeTeamGoals, awayTeamGoals, inProgress } = match;

      if (inProgress === false && homeTeamGoals === awayTeamGoals) {
        draws += 1;
      }
    });

    return draws;
  };

  private calcTotalGames = (newMatches: IMatch[]) => {
    let games = 0;

    newMatches.forEach((match) => {
      const { teamHome: { teamName }, inProgress } = match;

      if (inProgress === false && teamName) {
        games += 1;
      }
    });

    return games;
  };

  private calcTotalLosses = (newMatches: IMatch[]) => {
    let losses = 0;

    newMatches.forEach((match) => {
      const { homeTeamGoals, awayTeamGoals, inProgress } = match;

      if (inProgress === false && homeTeamGoals < awayTeamGoals) {
        losses += 1;
      }
    });

    return losses;
  };

  private calcTotalPoints = (newMatches: IMatch[]) => {
    let points = 0;

    newMatches.forEach((match) => {
      const { homeTeamGoals, awayTeamGoals, inProgress } = match;

      if (inProgress === false) {
        if (homeTeamGoals > awayTeamGoals) {
          points += 3;
        }

        if (awayTeamGoals === homeTeamGoals) {
          points += 1;
        }
      }
    });

    return points;
  };

  private calcTotalWins = (newMatches: IMatch[]) => {
    let wins = 0;

    newMatches.forEach((match) => {
      const { homeTeamGoals, awayTeamGoals, inProgress } = match;

      if (inProgress === false && homeTeamGoals > awayTeamGoals) {
        wins += 1;
      }
    });

    return wins;
  };

  public getAll = async () => {
    const matches = await this.matchesServices.getAll();
    const teams = await this.teamsServices.getAll();

    return teams.map((team) => {
      const newMatches = matches.filter(({ teamHome }) => team.teamName === teamHome.teamName);

      return {
        name: team.teamName,
        totalPoints: this.calcTotalPoints(newMatches),
        totalGames: this.calcTotalGames(newMatches),
        totalVictories: this.calcTotalWins(newMatches),
        totalDraws: this.calcTotalDraws(newMatches),
        totalLosses: this.calcTotalLosses(newMatches),
        goalsFavor: this.calcGoalsFavor(newMatches),
        goalsOwn: this.calcGoalsOwn(newMatches),
        goalsBalance: this.calcGoalsBalance(newMatches),
        efficiency: this.calcTeamUsage(newMatches),
      };
    });
  };

  public getAllAndReverseSort = async () => {
    const leaderboard = await this.getAll();

    return leaderboard.sort((team1, team2) => (
      team2.totalPoints - team1.totalPoints
      || team2.totalVictories - team1.totalVictories
      || team2.goalsBalance - team1.goalsBalance
      || team2.goalsFavor - team1.goalsFavor
      || team1.goalsOwn - team2.goalsOwn
    ));
  };
}

export default LeaderboardServices;
