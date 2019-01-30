var constants = require('../src/constants');
var request = require('request');
var expect = require('chai').expect;

var baseUrl = 'http://localhost:' + (process.env.PORT || constants.PORT);

describe('/GET /list/:listID/:page', function() {
    var response;
    before(function(done) {
        var api = baseUrl + '/list/' + constants.TEST.LIST_ID + '/1';
        request(api, function(err, res) {
            response = res;
            console.log('\n  response received, starting tests...\n');
            done();
        });
    });
    it('should respond with a 200 status code', function() {
        expect(response.statusCode).to.equal(200);
    });
    it('should contain basic list info', function() {
        var body = JSON.parse(response.body);
        expect(body.id).to.equal(constants.TEST.LIST_ID);
        expect(body.name).to.equal('Watched: Movies');
        expect(body.user.id).to.equal(constants.TEST.USER_ID);
        expect(body.user.name).to.equal('iwantmoarcookiez');
        expect(body.public).to.be.true;
    });
});
