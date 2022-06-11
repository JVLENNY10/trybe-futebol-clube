const loginRequest = {
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
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
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

export { loginRequest, loginResponse, userExpected };
