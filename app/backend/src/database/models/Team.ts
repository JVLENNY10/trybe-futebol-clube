import { Model, DataTypes } from 'sequelize';
import db from '.';

class Team extends Model {
  public id?: number;
  public teamName: string;
}

Team.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: DataTypes.STRING,
}, {
  modelName: 'team',
  sequelize: db,
  timestamps: false,
  underscored: true,
});

export default Team;
