import { Model, DataTypes } from 'sequelize';
import db from '.';

class Team extends Model {
  teamName: string;
}

Team.init({
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'team',
  timestamps: false,
});

export default Team;
