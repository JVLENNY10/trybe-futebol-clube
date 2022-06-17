interface ITeamsFunctions {
  getAll: () => Promise<ITeam[]>;
}

interface ITeam {
  id: number,
  teamName: string,
}

export { ITeamsFunctions, ITeam };
