import { Model, DataTypes } from 'sequelize';
import db from '.';

class matche extends Model {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

matche.init({
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.TINYINT,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'matche',
  timestamps: false,
});

export default matche;
