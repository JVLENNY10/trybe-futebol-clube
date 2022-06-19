interface IMatch {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

interface IMatchesFunctions {
  getAll: () => Promise<IMatch[]>;
  getAllByProgress: (inProgress: string) => Promise<IMatch[]>;
  matchFinished: (id: string) => Promise<void>;
  matchStarted: (newMatch: object) => Promise<IMatchStarted>;
}

interface IMatchStarted {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export { IMatch, IMatchesFunctions, IMatchStarted };
