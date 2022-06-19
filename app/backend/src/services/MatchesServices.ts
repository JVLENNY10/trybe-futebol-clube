import Matche from '../database/models/Match';
import Team from '../database/models/Team';
import { IMatchesFunctions, IMatche } from '../interfaces/MatchesInterfaces';

class MatchesServices implements IMatchesFunctions {
  public getAll = async (): Promise<IMatche[]> => {
    const matches = await Matche.findAll({
      include: [
        { as: 'teamHome', attributes: ['teamName'], model: Team },
        { as: 'teamAway', attributes: ['teamName'], model: Team },
      ],
    });

    return matches as IMatche[];
  };
}

export default MatchesServices;