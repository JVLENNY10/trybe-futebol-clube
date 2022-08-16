import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Team from '../database/models/Team';
import { allTeamsResponse, oneTeamResponse } from './mocks/teamsMocks';

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

describe('Sucesso em requisição do tipo GET para "/teams/:id"', () => {
  let response: Response;

  before(() => {
    sinon.stub(Team, 'findByPk').resolves(oneTeamResponse as Team);
  });

  after(() => {
    (Team.findByPk as sinon.SinonStub).restore();
  });

  it('Retorna um status 200(OK) e a resposta esperada', async () => {
    response = await chai.request(app).get('/teams/1').send();

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(oneTeamResponse);
  });
});

const before = (arg0: () => void) => {
  throw new Error('Function not implemented.');
}

const after = (arg0: () => void) => {
  throw new Error('Function not implemented.');
}
