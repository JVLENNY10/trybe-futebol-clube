interface IUsersFunctions {
  loginUser: (email: string) => Promise<null | object>;
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

export { IUsersFunctions, IUser };
