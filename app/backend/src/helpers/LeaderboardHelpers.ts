import { IMatch } from '../interfaces/MatchesInterfaces';

class LeaderboardHelpers {
  public calcGoals = (matches: IMatch[], teamName: string) => {
    let goals = 0;

    matches.forEach(({ awayTeamGoals, homeTeamGoals, inProgress, teamAway, teamHome }) => {
      if (inProgress === false) {
        if (teamName === teamAway.teamName) {
          goals += awayTeamGoals;
        } else if (teamName === teamHome.teamName) {
          goals += homeTeamGoals;
        }
      }
    });

    return goals;
  };

  public calcGoalsBalance = (matches: IMatch[], teamName: string) => {
    const goalsFavor = this.calcGoals(matches, teamName);
    const goalsOwn = this.calcGoalsOwn(matches, teamName);

    return goalsFavor - goalsOwn;
  };

  public calcGoalsOwn = (matches: IMatch[], teamName: string) => {
    let goals = 0;

    matches.forEach(({ awayTeamGoals, homeTeamGoals, inProgress, teamAway, teamHome }) => {
      if (inProgress === false) {
        if (teamName === teamAway.teamName) {
          goals += homeTeamGoals;
        } else if (teamName === teamHome.teamName) {
          goals += awayTeamGoals;
        }
      }
    });

    return goals;
  };

  public calcTeamUsage = (matches: IMatch[], teamName: string) => {
    const totalGames = this.calcTotalGames(matches, teamName);
    const totalPoints = this.calcTotalPoints(matches, teamName);
    const teamUsage = (totalPoints / (totalGames * 3)) * 100;

    return Number(teamUsage.toFixed(2));
  };

  public calcTotalDraws = (matches: IMatch[], teamName: string) => {
    let draws = 0;

    matches.forEach(({ awayTeamGoals, homeTeamGoals, inProgress, teamAway, teamHome }) => {
      const checkTeam = teamName === teamAway.teamName || teamName === teamHome.teamName;

      if (inProgress === false && checkTeam && awayTeamGoals === homeTeamGoals) {
        draws += 1;
      }
    });

    return draws;
  };

  public calcTotalGames = (matches: IMatch[], teamName: string) => {
    let games = 0;

    matches.forEach(({ inProgress, teamAway, teamHome }) => {
      const checkTeam = teamName === teamAway.teamName || teamName === teamHome.teamName;

      if (inProgress === false && checkTeam) {
        games += 1;
      }
    });

    return games;
  };

  public calcTotalLosses = (matches: IMatch[], teamName: string) => {
    let losses = 0;

    matches.forEach(({ awayTeamGoals, homeTeamGoals, inProgress, teamAway, teamHome }) => {
      const awayTeamIsLoser = teamName === teamAway.teamName && awayTeamGoals < homeTeamGoals;
      const homeTeamIsLoser = teamName === teamHome.teamName && awayTeamGoals > homeTeamGoals;
      const checkLosingTeam = awayTeamIsLoser || homeTeamIsLoser;

      if (inProgress === false && checkLosingTeam) {
        losses += 1;
      }
    });

    return losses;
  };

  public calcTotalPoints = (matches: IMatch[], teamName: string) => {
    let points = 0;

    matches.forEach(({ awayTeamGoals, homeTeamGoals, inProgress, teamAway, teamHome }) => {
      const checkTeam = teamName === teamAway.teamName || teamName === teamHome.teamName;

      if (inProgress === false && checkTeam) {
        if (teamName === teamAway.teamName && awayTeamGoals > homeTeamGoals) {
          points += 3;
        } else if (teamName === teamHome.teamName && awayTeamGoals < homeTeamGoals) {
          points += 3;
        } else if (awayTeamGoals === homeTeamGoals) {
          points += 1;
        }
      }
    });

    return points;
  };

  public calcTotalWins = (matches: IMatch[], teamName: string) => {
    let wins = 0;

    matches.forEach(({ awayTeamGoals, homeTeamGoals, inProgress, teamAway, teamHome }) => {
      const awayTeamIsWinner = teamName === teamAway.teamName && awayTeamGoals > homeTeamGoals;
      const homeTeamIsWinner = teamName === teamHome.teamName && awayTeamGoals < homeTeamGoals;
      const checkWinnerTeam = awayTeamIsWinner || homeTeamIsWinner;

      if (inProgress === false && checkWinnerTeam) {
        wins += 1;
      }
    });

    return wins;
  };

  public checkFilter = (localTeam: string, matches: IMatch[], teamName: string) => {
    if (localTeam === '/leaderboard/away') {
      return matches.filter(({ teamAway }) => teamName === teamAway.teamName);
    } if (localTeam === '/leaderboard/home') {
      return matches.filter(({ teamHome }) => teamName === teamHome.teamName);
    }

    return matches;
  };
}

export default LeaderboardHelpers;
