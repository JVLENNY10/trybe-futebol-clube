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
  allMatchesResponse,
  newMatchRequest,
  newMatchResponse,
  updateMatchEqualTeamsRequest,
  updateMatchNonexistentTeamRequest,
  updateMatchRequest,
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

describe('Sucesso em requisição do tipo PATCH para "/matches/:id"', () => {
  let response: Response;

  before(() => {
    sinon.stub(Match, 'create').resolves();
  });

  after(() => {
    (Match.create as sinon.SinonStub).restore();
  });

  it('Retorna um status 200(OK) e uma mensagem de sucesso', async () => {
    response = await chai.request(app).post('/matches/:id').send(updateMatchRequest);

    expect(response).to.have.status(200);
    expect(response.body.message).to.deep.equal('Updated Match');
  });
});

describe('Fracasso em requisição do tipo PATCH para "/matches/:id"', () => {
  let response: Response;

  before(() => {
    sinon.stub(Match, 'create').resolves();
  });

  after(() => {
    (Match.create as sinon.SinonStub).restore();
  });

  it('Times iguais - Retorna um status 401(Unauthorized) e uma mensagem de erro', async () => {
    response = await chai.request(app).post('/matches/:id').send(updateMatchEqualTeamsRequest);

    expect(response).to.have.status(401);
    expect(response.body.message).to.deep.equal('It is not possible to create a match with two equal teams');
  });

  it('Time inexistente - Retorna um status 404(Not Found) e uma mensagem de erro', async () => {
    response = await chai.request(app).post('/matches/:id').send(updateMatchNonexistentTeamRequest);

    expect(response).to.have.status(404);
    expect(response.body.message).to.deep.equal('There is no team with such id!');
  });
});

describe('Sucesso em requisição do tipo PATCH para "/matches/:id/finish"', () => {
  let response: Response;

  before(() => {
    sinon.stub(Match, 'create').resolves();
  });

  after(() => {
    (Match.create as sinon.SinonStub).restore();
  });

  it('Retorna um status 200(OK) e uma mensagem de sucesso', async () => {
    response = await chai.request(app).post('/matches/:id/finish').send(newMatchRequest);

    expect(response).to.have.status(200);
    expect(response.body.message).to.deep.equal('Finished');
  });
});

describe('Sucesso em requisição do tipo POST para "/matches"', () => {
  let response: Response;

  before(() => {
    sinon.stub(Match, 'create').resolves(newMatchResponse as Match);
  });

  after(() => {
    (Match.create as sinon.SinonStub).restore();
  });

  it('Retorna um status 201(Created) e a resposta esperada', async () => {
    response = await chai.request(app).post('/matches').send(newMatchRequest);

    expect(response).to.have.status(201);
    expect(response.body).to.deep.equal(newMatchResponse);
  });
});

const before = (arg0: () => void) => {
  throw new Error('Function not implemented.');
}

const after = (arg0: () => void) => {
  throw new Error('Function not implemented.');
}
