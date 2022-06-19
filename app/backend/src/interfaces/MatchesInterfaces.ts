interface IMatchesFunctions {
  getAll: () => Promise<IMatche[]>;
  getAllByProgress: (inProgress: string) => Promise<IMatche[]>;
}

interface IMatche {
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

export { IMatchesFunctions, IMatche };
