interface IUsersFunctions {
  login: (email: string, password: string) => Promise<object | null>;
}

interface IUser {
  user: {
    id: number,
    username: string,
    role: string,
    email: string
  },
  token: string,
}

interface IUserToken {
  data: {
    id: number,
    email: string,
    role: string
  }
}

export { IUsersFunctions, IUser, IUserToken };
