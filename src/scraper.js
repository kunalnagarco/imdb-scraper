var fetch = require('node-fetch')
var cheerio = require('cheerio');

var watchlistUrl = 'https://www.imdb.com/user/<userID>/watchlist?sort=date_added%2Cdesc&view=detail';
var listUrl = 'https://www.imdb.com/list/<listID>/?sort=date_added,desc&st_dt=&mode=detail&page=<pageNumber>';
var titleUrl = 'https://www.imdb.com/title/<titleID>';

function getWatchlist(userID) {
	return new Promise(function(resolve, reject) {
		fetch(watchlistUrl.replace('<userID>', userID))
		.then(function(response) {
			return response.text()
		})
		.then(function(body) {
			var a = body.match('IMDbReactInitialState.push\((.*)\)\;');
			var b = a[0].split('IMDbReactInitialState.push(')[1];
			var c = JSON.parse(b.slice(0, -2)).titles;
			resolve(c)
		})
	});
};

function getList(listID, page) {
	var movies = [];
	return new Promise(function(resolve, reject) {
		fetch(listUrl.replace('<listID>', listID).replace('<pageNumber>', page))
		.then(function(response) {
			return response.text()
		})
		.then(function(body) {
			var $ = cheerio.load(body);
			var listName = $('.header.list-name').text();
			var listCreated = ($('#list-overview-created').text()).split(' - ')[1];
			var listPrivacyText = $('.privacy-overview').text().trim();
			var listPrivacy = false;
			if(listPrivacyText === 'Public') {
				listPrivacy = true;
			}
			var $listUser = $('#list-overview-summary > a');
			var listUserID = $listUser.attr('href').match(/user\/(.*)\//)[1];
			var listUser = {
				id: listUserID,
				link: '/user/' + listUserID,
				name: $listUser.text()
			};
			$('.lister-list .lister-item').each(function(i, element) {
				var $that = $(element);
				var movie = {};
				var $p = $that.find('p');
				var poster = $that.find('.lister-item-image img').attr('loadlate');
				var title = $that.find('.lister-item-header a').text();
				var href = $that.find('.lister-item-header a').attr('href');
				var id = href.match(/title\/(.*)\//)[1];
				var link = '/title/' + id;
				var year = parseInt((($that.find('.lister-item-header .lister-item-year').text()).slice(1, -1)));
				var rating = parseFloat($that.find('.ipl-rating-star__rating').text());
				var metascore = parseInt($that.find('.metascore').text().trim());
				var certificate = $that.find('.certificate').text();
				var runtimeTotal = ($that.find('.runtime').text()).split(' ');
				var runtime = {
					val: parseInt(runtimeTotal[0]),
					unit: runtimeTotal[1]
				};
				var genres = [];
				var x = $that.find('.genre').text().trim().split(',');
				for(var q = 0; q < x.length; q++) {
					x[q] = x[q].trim();
					var _val = x[q].toLowerCase();
					genres.push({
						link: '/search/title?genres=' + _val,
						name: x[q]
					});
				}
				var summary = $that.find('.ratings-metascore + p').text().trim();
				var directors = [];
				$($p.get(2)).children().each(function(j, el) {
					var $t = $(el);
					if($t.is('a')) {
						var _id = $t.attr('href').match(/name\/(.*)\//)[1];
						directors.push({
							id: _id,
							link: '/name/' + _id,
							name: $t.text().trim()
						});
					} else {
						return false;
					}
				});
				var stars = [];
				$($p.get(2)).find('.ghost').nextAll('a').each(function(j, el) {
					var $t = $(el);
					if($t.is('a')) {
						var _id = $t.attr('href').match(/name\/(.*)\//)[1];
						stars.push({
							id: _id,
							link: '/name/' + _id,
							name: $t.text().trim()
						});
					}
				});
				var votes = parseInt($($p.get(3)).find('span[name="nv"]').eq(0).attr('data-value'));
				var gross = $($p.get(3)).find('span[name="nv"]').eq(1).attr('data-value');
				movie.id = id;
				movie.name = title;
				movie.link = link;
				movie.summary = summary;
				movie.directors = directors;
				movie.stars = stars;
				movie.poster = poster;
				movie.year = year;
				movie.rating = rating;
				movie.metascore = metascore;
				movie.certificate = certificate;
				movie.runtime = runtime;
				movie.genres = genres;
				movie.votes = votes;
				if(typeof gross !== 'undefined') {
					gross = parseInt(gross.replace(/,/g, ''));
					movie.gross = gross;
				}
				movies.push(movie);
			});
			resolve({
				id: listID,
				name: listName,
				link: '/list/' + listID,
				created: listCreated,
				public: listPrivacy,
				user: listUser,
				titles: movies
			});
		})
	});
};

function getTitle(titleID) {
	return new Promise(function(resolve, reject) {
		fetch(titleUrl.replace('<titleID>', titleID))
		.then(function(response) {
			return response.text()
		})
		.then(function(body) {
			var $ = cheerio.load(body);
			var data = JSON.parse($('script[type="application/ld+json"]').html());
			var title = data.name;
			var link = data.url;
			var poster = data.image;
			var genres = [];
			for(var i = 0; i < data.genre.length; i++) {
				genres.push({
					link: '/search/title?genres=' + data.genre[i].toLowerCase(),
					name: data.genre[i]
				});
			}
			var rating = data.contentRating;
			var actors = [];
			for(var i = 0; i < data.actor.length; i++) {
				actors.push({
					link: data.actor[i].url,
					name: data.actor[i].name
				});
			}
			var directors = [];
			if(Array.isArray(data.director)) {
				for(var i = 0; i < data.director.length; i++) {
					directors.push({
						link: data.director[i].url,
						name: data.director[i].name
					});
				}
			} else {
				directors.push({
					link: data.director.url,
					name: data.director.name
				});
			}
			var creators = [];
			for(var i = 0; i < data.creator.length; i++) {
				var name = '';
				if(typeof data.creator[i].name === 'undefined') {
					$('#titleDetails .txt-block a').each(function(j, element) {
						var $element = $(element);
						if($element.attr('href').indexOf(data.creator[i].url.slice(0, -1)) !== -1) {
							name = $element.text().trim();
						}
					});
				} else {
					name = data.creator[i].name;
				}
				creators.push({
					link: data.creator[i].url,
					name: name
				});
			}
			var summary = $('.summary_text').text().trim();
			var description = data.description;
			var published = data.datePublished;
			var keywords = data.keywords.split(',');

			var runtimeArray = $('time').text().split('\n');
			var runtime = runtimeArray[1].trim();

			var trailer = {
				link: data.trailer.embedUrl,
				name: data.trailer.name
			};
			var metascore = parseInt($('.metacriticScore').text().trim());
			var storyline = $('#titleStoryLine').find('div.inline').eq(0).find('span').text().trim();
			resolve({
				id: titleID,
				name: title,
				summary: summary,
				description: description,
				storyline: storyline,
				link: link,
				poster: poster,
				rating: rating,
				runtime: runtime,
				published: published,
				trailer: trailer,
				metascore: metascore,
				genres: genres,
				actors: actors,
				directors: directors,
				creators: creators,
				keywords: keywords
			});
		});
	});
};

module.exports = {
	getWatchlist,
	getList,
	getTitle
};