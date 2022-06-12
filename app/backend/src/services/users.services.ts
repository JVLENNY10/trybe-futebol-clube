import User from '../database/models/User';
import jwtGenerator from '../jwt/jwtGenerator';
import { IUsersFunctions, IUser } from '../interfaces/users.interfaces';

class UsersServices implements IUsersFunctions {
  public loginUser = async (email: string): Promise<null | IUser> => {
    const user = await User.findOne({ attributes: { exclude: ['password'] }, where: { email } });

    if (user !== null) {
      const { id } = user;
      const token = jwtGenerator({ id, email });
      const result = { user, token };

      return result as IUser;
    }

    return null;
  };
}

export default UsersServices;
