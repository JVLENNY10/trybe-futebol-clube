import Bcrypt = require('bcryptjs');
import JwtServices from './jwt.services';
import User from '../database/models/User';
import { IUsersFunctions, IUser } from '../interfaces/users.interfaces';

class UsersServices implements IUsersFunctions {
  private jwtServices: JwtServices;

  constructor() {
    this.jwtServices = new JwtServices();
  }

  public login = async (email: string, password: string): Promise<IUser | null> => {
    const user = await User.findOne({ where: { email } });

    if (user !== null) {
      const passwordExists = Bcrypt.compareSync(password, user.password);

      if (passwordExists) {
        const { id, username, role } = user;
        const token = this.jwtServices.encoder({ id, email, role });

        const result = {
          user: { id, username, role, email },
          token,
        };

        return result as IUser;
      }
    }

    return null;
  };

  public loginValidate = async (id: number): Promise<string> => {
    const user = await User.findOne({ where: { id } });
    return user?.role as string;
  };
}

export default UsersServices;
