import { Model, DataTypes } from 'sequelize';
import Team from './Team';
import db from '.';

class Match extends Model {
  public id?: number;
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
  public teamHome: { teamName: string };
  public teamAway: { teamName: string };
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  modelName: 'match',
  sequelize: db,
  timestamps: false,
  underscored: true,
});

Match.belongsTo(Team, { as: 'teamHome', foreignKey: 'homeTeam' });
Match.belongsTo(Team, { as: 'teamAway', foreignKey: 'awayTeam' });

Team.hasMany(Match, { as: 'teamHome', foreignKey: 'homeTeam' });
Team.hasMany(Match, { as: 'teamAway', foreignKey: 'awayTeam' });

export default Match;
