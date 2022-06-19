import { Model, DataTypes } from 'sequelize';
import db from '.';

class User extends Model {
  public id?: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  modelName: 'user',
  sequelize: db,
  timestamps: false,
  underscored: true,
});

export default User;
