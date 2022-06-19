import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch, IMatchesFunctions, INewMatch } from '../interfaces/MatchesInterfaces';

class MatchesServices implements IMatchesFunctions {
  public create = async (newMatch: object): Promise<INewMatch> => {
    const match = await Match.create(newMatch);
    return match as INewMatch;
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
}

export default MatchesServices;
