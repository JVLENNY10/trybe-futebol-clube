import Bcrypt = require('bcryptjs');
import User from '../database/models/User';
import jwtGenerator from '../jwt/jwtGenerator';
import { IUsersFunctions, IUser } from '../interfaces/users.interfaces';

class UsersServices implements IUsersFunctions {
  public login = async (email: string, password: string): Promise<IUser | null> => {
    const user = await User.findOne({ where: { email } });
    const passwordExists = Bcrypt.compareSync(password, user?.password as string);

    if (!user || !passwordExists) return null;

    const { id, username, role } = user;
    const token = jwtGenerator({ id, email });

    const result = {
      user: { id, username, role, email },
      token,
    };

    return result as IUser;
  };
}

export default UsersServices;
