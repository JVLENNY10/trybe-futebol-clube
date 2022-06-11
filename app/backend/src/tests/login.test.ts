import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

import User from '../database/models/User';
import { loginRequest, loginResponse, userExpected, invalidEmail } from './mock/models/usersMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Sucesso em requisição do tipo POST para /login', () => {
  let response: Response;

  before(() => {
    sinon.stub(User, 'findOne').resolves(userExpected as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('Retorna um status 200(OK) e a resposta esperada', async () => {
    response = await chai.request(app).post('login').send(loginRequest);

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(loginResponse);
  });
});

describe('Fracasso em requisição do tipo POST para /login', () => {
  let response: Response;

  before(() => {
    sinon.stub(User, 'findOne').resolves(userExpected as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('E-Mail inválido: Retorna um status 401(Unauthorized) e uma mensagem de erro', async () => {
    response = await chai.request(app).post('login').send(invalidEmail);

    expect(response).to.have.status(401);
    expect(response.body.message).to.deep.equal('Incorrect email or password');
  });
});

function before(arg0: () => void) {
  throw new Error('Function not implemented.');
}

function after(arg0: () => void) {
  throw new Error('Function not implemented.');
}
