const loginBody = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const loginResponse = {
  user: {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com'
  },
  token: '123.456.789'
}

const userExpected = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const invalidEmail = {
  email: 'admin',
  password: 'secret_admin'
}

const invalidPassword = {
  email: 'admin@admin.com',
  password: 'secret'
}


const nullEmail = {
  password: 'secret_admin'
}

const nullPassword = {
  email: 'admin@admin.com',
}

export {
  loginBody,
  loginResponse,
  userExpected,
  invalidEmail,
  invalidPassword,
  nullEmail,
  nullPassword
};
