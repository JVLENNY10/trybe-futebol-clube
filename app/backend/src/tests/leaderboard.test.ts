import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { allTeamsResponse } from './mocks/teamsMocks';
import { allMatchesResponse } from './mocks/matchesMocks';
import { leaderboard, leaderboardAway, leaderboardHome } from './mocks/leaderboardMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Sucesso em requisição do tipo GET para "/leaderboard"', () => {
  let response: Response;

  before(() => {
    sinon.stub(Match, 'findAll').resolves(allMatchesResponse as Match[]);
    sinon.stub(Team, 'findAll').resolves(allTeamsResponse as Team[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
    (Team.findAll as sinon.SinonStub).restore();
  });

  it('Retorna um status 200(OK) e a resposta esperada', async () => {
    response = await chai.request(app).get('/leaderboard').send();

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(leaderboard);
  });
});

describe('Sucesso em requisição do tipo GET para "/leaderboard/away"', () => {
  let response: Response;

  before(() => {
    sinon.stub(Match, 'findAll').resolves(allMatchesResponse as Match[]);
    sinon.stub(Team, 'findAll').resolves(allTeamsResponse as Team[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
    (Team.findAll as sinon.SinonStub).restore();
  });

  it('Retorna um status 200(OK) e a resposta esperada', async () => {
    response = await chai.request(app).get('/leaderboard/away').send();

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(leaderboardAway);
  });
});

describe('Sucesso em requisição do tipo GET para "/leaderboard/home"', () => {
  let response: Response;

  before(() => {
    sinon.stub(Match, 'findAll').resolves(allMatchesResponse as Match[]);
    sinon.stub(Team, 'findAll').resolves(allTeamsResponse as Team[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
    (Team.findAll as sinon.SinonStub).restore();
  });

  it('Retorna um status 200(OK) e a resposta esperada', async () => {
    response = await chai.request(app).get('/leaderboard/home').send();

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(leaderboardHome);
  });
});

const before = (arg0: () => void) => {
  throw new Error('Function not implemented.');
}

const after = (arg0: () => void) => {
  throw new Error('Function not implemented.');
}
