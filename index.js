var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var scraper = require('./src/scraper');
var baseUrl = 'https://www.imdb.com';

app.get('/watchlist/:userID', function(req, res) {
	scraper.getWatchlist(req.params.userID)
		.then(function(data) {
			res.json(data);
		});
});

app.get('/list/:listID/:page', function(req, res) {
	scraper.getList(req.params.listID, req.params.page)
		.then(function(data) {
			res.json({
				baseUrl: baseUrl,
				id: req.params.listID,
				name: data.name,
				link: data.link,
				created: data.created,
				public: data.public,
				user: data.user,
				titles: data.titles
			});
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