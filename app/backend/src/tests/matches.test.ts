import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Match from '../database/models/Match';
import {
  allMatchesInprogressFalseResponse,
  allMatchesInProgressTrueResponse,
  allMatchesResponse
} from './mocks/matchesMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Sucesso em requisição do tipo GET para "/matches"', () => {
  let response: Response;

  before(() => {
    sinon.stub(Match, 'findAll').resolves(allMatchesResponse as Match[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
  });

  it('Retorna um status 200(OK) e a resposta esperada', async () => {
    response = await chai.request(app).get('/matches').send();

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(allMatchesResponse);
  });
});

describe('Sucesso em requisição do tipo GET para "/matches?inProgress"', () => {
  let response: Response;

  before(() => {
    sinon.stub(Match, 'findAll').resolves(allMatchesInProgressTrueResponse as Match[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
  });

  it('/matches?inProgress=true - Retorna um status 200(OK) e a resposta esperada', async () => {
    response = await chai.request(app).get('/matches?inProgress=true').send();

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(allMatchesInProgressTrueResponse);
  });

  it('/matches?inProgress=false - Retorna um status 200(OK) e a resposta esperada', async () => {
    response = await chai.request(app).get('/matches?inProgress=false').send();

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(allMatchesInprogressFalseResponse);
  });
});

const before = (arg0: () => void) => {
  throw new Error('Function not implemented.');
}

const after = (arg0: () => void) => {
  throw new Error('Function not implemented.');
}
