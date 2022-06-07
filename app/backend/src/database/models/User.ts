import { Model, DataTypes } from 'sequelize';
import db from '.';

class User extends Model {
  username: string;
  role: string;
  email: string;
  password: string;
}

User.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'user',
  timestamps: false,
});

export default User;
