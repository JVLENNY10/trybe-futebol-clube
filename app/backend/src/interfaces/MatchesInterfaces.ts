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
  finish: (id: string) => Promise<void>;
  getAll: () => Promise<IMatch[]>;
  getAllByProgress: (inProgress: string) => Promise<IMatch[]>;
  start: (newMatch: object) => Promise<IMatchStart>;
  update: (id: string, homeTeamGoals: number, awayTeamGoals: number) => Promise<void>;
}

interface IMatchStart {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export { IMatch, IMatchesFunctions, IMatchStart };
