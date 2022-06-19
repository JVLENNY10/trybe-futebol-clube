import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch, IMatchesFunctions, IMatchStarted } from '../interfaces/MatchesInterfaces';

class MatchesServices implements IMatchesFunctions {
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

  public matchFinished = async (id: string): Promise<void> => {
    await Match.update({ inProgress: false }, { where: { id } });
  };

  public matchStarted = async (newMatch: object): Promise<IMatchStarted> => {
    const match = await Match.create(newMatch);
    return match as IMatchStarted;
  };
}

export default MatchesServices;
