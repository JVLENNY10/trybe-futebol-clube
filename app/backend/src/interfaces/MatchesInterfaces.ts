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
  create: (newMatch: object) => Promise<INewMatch>;
  getAll: () => Promise<IMatch[]>;
  getAllByProgress: (inProgress: string) => Promise<IMatch[]>;
}

interface INewMatch {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export { IMatch, IMatchesFunctions, INewMatch };
