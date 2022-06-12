import User from '../database/models/User';
import { IUsersFunctions, IUser } from '../interfaces/users.interfaces';

class UsersServices implements IUsersFunctions {
  public loginUser = async (email: string): Promise<null | IUser> => {
    const user = await User.findOne({ where: { email } });

    if (user !== null) {
      const { id, username, role } = user;
      const result = { id, username, role, email };
      return result as IUser;
    }

    return null;
  };
}

export default UsersServices;
