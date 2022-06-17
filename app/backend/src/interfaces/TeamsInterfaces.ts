interface ITeamsFunctions {
  getAll: () => Promise<ITeam[]>;
  getById: (id: string) => Promise<ITeam>;
}

interface ITeam {
  id: number,
  teamName: string,
}

export { ITeamsFunctions, ITeam };
