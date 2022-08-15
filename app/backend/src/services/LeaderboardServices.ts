import TeamsServices from './TeamsServices';
import MatchesServices from './MatchesServices';
import LeaderboardHelpers from '../helpers/LeaderboardHelpers';

class LeaderboardServices {
  private leaderboardHelpers: LeaderboardHelpers;
  private matchesServices: MatchesServices;
  private teamsServices: TeamsServices;

  constructor() {
    this.leaderboardHelpers = new LeaderboardHelpers();
    this.matchesServices = new MatchesServices();
    this.teamsServices = new TeamsServices();
  }

  public getAll = async (localTeam: string) => {
    const matches = await this.matchesServices.getAll();
    const teams = await this.teamsServices.getAll();

    return teams.map(({ teamName }) => {
      const filterMatches = this.leaderboardHelpers.checkFilter(localTeam, matches, teamName);

      return {
        name: teamName,
        totalPoints: this.leaderboardHelpers.calcTotalPoints(filterMatches, teamName),
        totalGames: this.leaderboardHelpers.calcTotalGames(filterMatches, teamName),
        totalVictories: this.leaderboardHelpers.calcTotalWins(filterMatches, teamName),
        totalDraws: this.leaderboardHelpers.calcTotalDraws(filterMatches, teamName),
        totalLosses: this.leaderboardHelpers.calcTotalLosses(filterMatches, teamName),
        goalsFavor: this.leaderboardHelpers.calcGoals(filterMatches, teamName),
        goalsOwn: this.leaderboardHelpers.calcGoalsOwn(filterMatches, teamName),
        goalsBalance: this.leaderboardHelpers.calcGoalsBalance(filterMatches, teamName),
        efficiency: this.leaderboardHelpers.calcTeamUsage(filterMatches, teamName),
      };
    });
  };

  public getAllAndReverseSort = async (localTeam: string) => {
    const leaderboard = await this.getAll(localTeam);

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
