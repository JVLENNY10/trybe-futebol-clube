import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

import Team from '../database/models/Team';

import { allTeamsResponse } from './mock/models/teamsMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Sucesso em requisição do tipo GET para "/teams"', () => {
  let response: Response;

  before(() => {
    sinon.stub(Team, 'findAll').resolves(allTeamsResponse as Team[]);
  });

  after(() => {
    (Team.findAll as sinon.SinonStub).restore();
  });

  it('Retorna um status 200(OK) e a resposta esperada', async () => {
    response = await chai.request(app).get('/teams').send();

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(allTeamsResponse);
  });
});

const before = (arg0: () => void) => {
  throw new Error('Function not implemented.');
}

const after = (arg0: () => void) => {
  throw new Error('Function not implemented.');
}
