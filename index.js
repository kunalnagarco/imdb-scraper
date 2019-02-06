var constants = require('./src/constants');
var express = require('express');
var app = express();
var port = process.env.PORT || constants.PORT;

var scraper = require('./src/scraper');

app.get('/watchlist/:userID', function(req, res) {
	scraper.getWatchlist(req.params.userID)
		.then(function(data) {
			res.json(data);
		});
});

app.get('/list/:listID/:page', function(req, res) {
	scraper.getList(req.params.listID, req.params.page)
		.then(function(data) {
			res.json(data);
		});
});

app.get('/title/:titleID', function(req, res) {
	scraper.getTitle(req.params.titleID)
		.then(function(data) {
			res.json(data);
		});
});

app.get('/name/:personID', function(req, res) {
	scraper.getPerson(req.params.personID)
		.then(function(data) {
			res.json(data);
		});
});

app.listen(port, function() {
	console.log('Listening on port: ' + port);
});

module.exports = app;
