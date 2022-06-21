import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch, IMatchesFunctions, IMatchStart } from '../interfaces/MatchesInterfaces';

class MatchesServices implements IMatchesFunctions {
  public finish = async (id: string): Promise<void> => {
    await Match.update({ inProgress: false }, { where: { id } });
  };

  public getAll = async (): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      include: [
        { as: 'teamHome', attributes: ['teamName'], model: Team },
        { as: 'teamAway', attributes: ['teamName'], model: Team },
      ],
    });

    return matches as IMatch[];
  };

  public getAllByProgress = async (inProgress: string): Promise<IMatch[]> => {
    const inProgressParsed = JSON.parse(inProgress);

    const matches = await Match.findAll({
      include: [
        { as: 'teamHome', attributes: ['teamName'], model: Team },
        { as: 'teamAway', attributes: ['teamName'], model: Team },
      ],
      where: { inProgress: inProgressParsed },
    });

    return matches as IMatch[];
  };

  public start = async (newMatch: object): Promise<IMatchStart> => {
    const match = await Match.create(newMatch);
    return match as IMatchStart;
  };

  public update = (
    async (id: string, homeTeamGoals: number, awayTeamGoals: number): Promise<void> => {
      await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    }
  );
}

export default MatchesServices;
