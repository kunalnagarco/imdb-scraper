import request from 'request';
import { expect } from 'chai';
import { constants } from '../src/constants';

const baseUrl = `http://localhost:${process.env.PORT || constants.PORT}`;

describe('/GET /list/:listID/:page', () => {
  let response;
  before((done) => {
    const api = `${baseUrl}/list/${constants.TEST.LIST_ID}/1`;
    request(api, (err, res) => {
      response = res;
      done();
    });
  });
  it('should respond with a 200 status code', () => {
    expect(response.statusCode).to.equal(200);
  });
  it('should contain basic list info', () => {
    const body = JSON.parse(response.body);
    expect(body.id).to.equal(constants.TEST.LIST_ID);
    expect(body.name).to.equal('Watched: Movies');
    expect(body.user.id).to.equal(constants.TEST.USER_ID);
    expect(body.user.name).to.equal('iwantmoarcookiez');
    expect(body.public).to.be.true;
    expect(body.titles[0]).to.haveOwnProperty('id');
    expect(body.titles[0]).to.haveOwnProperty('name');
    expect(body.titles[0]).to.haveOwnProperty('link');
    expect(body.titles[0]).to.haveOwnProperty('year');
    expect(body.titles[0]).to.haveOwnProperty('plot');
  });
});
