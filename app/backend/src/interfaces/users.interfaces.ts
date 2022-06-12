interface IUsersFunctions {
  loginUser: (email: string) => Promise<null | object>;
}

interface IUser {
  id: number,
  username: string,
  role: string,
  email: string
}

export { IUsersFunctions, IUser };
