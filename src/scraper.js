var constants = require('./constants')

var Movie = require('./models/movie')
var Person = require('./models/person')

var fetch = require('node-fetch')
var cheerio = require('cheerio')
var _ = require('underscore')

/**
 * Get a user's watchlist
 *
 * @param  {String} userID e.g. ur39600768
 * @return {Object}
 */
function getWatchlist(userID) {
  return new Promise((resolve) => {
    fetch(constants.IMDB.WATCHLIST.replace('<userID>', userID))
      .then((response) => {
        return response.text()
      })
      .then((body) => {
        var a = body.match('IMDbReactInitialState.push((.*));')
        var [, b] = a[0].split('IMDbReactInitialState.push(')
        var listInfo = JSON.parse(b.slice(0, -2)).list
        var c = JSON.parse(b.slice(0, -2)).titles
        var data = {}
        var titles = []
        _.each(c, (title) => {
          var config = {
            id: title.id,
            name: title.primary.title,
            type: title.type,
            link: title.primary.href,
            year: parseInt(title.primary.year[0]),
            img: title.poster.url,
            plot: title.plot,
            certificate: title.metadata.certificate,
            rating: title.ratings.rating,
            votes: title.ratings.votes,
            movieMeterCurrentRank: title.movieMeterCurrentRank,
            runtime: title.metadata.runtime,
            release: title.metadata.release,
            metascore: title.ratings.metascore,
            genres: [],
            stars: [],
          }
          _.each(title.credits.star, (star) => {
            config.stars.push({
              link: star.href,
              name: star.name,
            })
          })

          if (title.credits.creator) {
            config.creators = []
            _.each(title.credits.creator, (creator) => {
              config.creators.push({
                link: creator.href,
                name: creator.name,
              })
            })
          }

          if (title.credits.director) {
            config.directors = []
            _.each(title.credits.director, (director) => {
              config.directors.push({
                link: director.href,
                name: director.name,
              })
            })
          }

          var movie = new Movie(config)
          _.each(title.metadata.genres, (genre) => {
            config.genres.push(movie.buildGenre(genre))
          })
          titles.push(JSON.parse(JSON.stringify(movie)))
        })
        data.id = listInfo.id
        data.name = listInfo.name
        data.titles = titles
        resolve(data)
      })
  })
}

/**
 * Get a user's list (public only)
 *
 * @param  {String} listID IMDb List ID e.g. ls057246838
 * @param  {Number} page   List page number e.g. 1
 * @return {Object}
 */
function getList(listID, page) {
  var movies = []

  return new Promise((resolve) => {
    fetch(
      constants.IMDB.LIST.replace('<listID>', listID).replace(
        '<pageNumber>',
        page
      )
    )
      .then((response) => {
        return response.text()
      })
      .then((body) => {
        var $ = cheerio.load(body)
        var listName = $('.header.list-name').text()
        var [, listCreated] = $('#list-overview-created').text().split(' - ')
        var listPrivacyText = $('.privacy-overview').text().trim()
        var listPrivacy = false

        if (listPrivacyText === 'Public') {
          listPrivacy = true
        }

        var $listUser = $('#list-overview-summary > a')
        var [, listUserID] = $listUser.attr('href').match(/user\/(.*)\//)
        var listUser = {
          id: listUserID,
          link: '/user/' + listUserID,
          name: $listUser.text(),
        }
        $('.lister-list .lister-item').each((i, element) => {
          var $that = $(element)
          var config = {}
          var $p = $that.find('p')
          var poster = $that.find('.lister-item-image img').attr('loadlate')
          var title = $that.find('.lister-item-header a').text()
          var href = $that.find('.lister-item-header a').attr('href')
          var [, id] = href.match(/title\/(.*)\//)
          var link = '/title/' + id
          var year = parseInt(
            $that
              .find('.lister-item-header .lister-item-year')
              .text()
              .slice(1, -1)
          )
          var rating = parseFloat($that.find('.ipl-rating-star__rating').text())
          var metascore = parseInt($that.find('.metascore').text().trim())
          var certificate = $that.find('.certificate').text()
          var runtimeTotal = $that.find('.runtime').text().split(' ')
          var runtime = {
            val: parseInt(runtimeTotal[0]),
            unit: runtimeTotal[1],
          }
          var genres = []
          var x = $that.find('.genre').text().trim().split(',')

          for (var q = 0; q < x.length; q++) {
            x[q] = x[q].trim()
            var _val = x[q].toLowerCase()
            genres.push({
              link: '/search/title?genres=' + _val,
              name: x[q],
            })
          }

          var summary = $that.find('.ratings-metascore + p').text().trim()
          var directors = []
          $($p.get(2))
            .children()
            .each((j, el) => {
              var $t = $(el)

              if ($t.is('a')) {
                var [, _id] = $t.attr('href').match(/name\/(.*)\//)
                directors.push({
                  id: _id,
                  link: '/name/' + _id,
                  name: $t.text().trim(),
                })
              } else {
                return false
              }
            })
          var stars = []
          $($p.get(2))
            .find('.ghost')
            .nextAll('a')
            .each((j, el) => {
              var $t = $(el)

              if ($t.is('a')) {
                var [, _id] = $t.attr('href').match(/name\/(.*)\//)
                stars.push({
                  id: _id,
                  link: '/name/' + _id,
                  name: $t.text().trim(),
                })
              }
            })
          var votes = parseInt(
            $($p.get(3)).find('span[name="nv"]').eq(0).attr('data-value')
          )
          var gross = $($p.get(3))
            .find('span[name="nv"]')
            .eq(1)
            .attr('data-value')
          config.id = id
          config.name = title
          config.link = link
          config.plot = summary
          config.directors = directors
          config.stars = stars
          config.poster = poster
          config.year = year
          config.rating = rating
          config.metascore = metascore
          config.certificate = certificate
          config.runtime = runtime
          config.genres = genres
          config.votes = votes

          if (typeof gross !== 'undefined') {
            gross = parseInt(gross.replace(/,/g, ''))
            config.gross = gross
          }

          var movie = new Movie(config)
          movies.push(movie)
        })
        resolve({
          id: listID,
          name: listName,
          link: '/list/' + listID,
          created: listCreated,
          public: listPrivacy,
          user: listUser,
          titles: movies,
        })
      })
  })
}

/**
 * Get Title details (Movies, TV Shows etc.)
 *
 * @param  {String} titleID IMDb Title ID e.g. tt0111161
 * @return {Object}
 */
function getTitle(titleID) {
  return new Promise((resolve) => {
    fetch(constants.IMDB.TITLE.replace('<titleID>', titleID))
      .then((response) => {
        return response.text()
      })
      .then((body) => {
        var $ = cheerio.load(body)
        var data = JSON.parse($('script[type="application/ld+json"]').html())
        var title = data.name
        var year = parseInt($('#titleYear').text().trim().slice(1, -1))
        var link = data.url
        var poster = data.image
        var rating = parseFloat($('span[itemprop="ratingValue"]').text())
        var genres = []

        for (let i = 0; i < data.genre.length; i++) {
          genres.push({
            link: '/search/title?genres=' + data.genre[i].toLowerCase(),
            name: data.genre[i],
          })
        }

        var certificate = data.contentRating
        var actors = []

        for (let i = 0; i < data.actor.length; i++) {
          actors.push({
            link: data.actor[i].url,
            name: data.actor[i].name,
          })
        }

        var directors = []

        if (Array.isArray(data.director)) {
          for (let i = 0; i < data.director.length; i++) {
            directors.push({
              link: data.director[i].url,
              name: data.director[i].name,
            })
          }
        } else {
          directors.push({
            link: data.director.url,
            name: data.director.name,
          })
        }

        var creators = []

        for (let i = 0; i < data.creator.length; i++) {
          var name = ''

          if (typeof data.creator[i].name === 'undefined') {
            $('#titleDetails .txt-block a').each((j, element) => {
              var $element = $(element)

              if (
                $element
                  .attr('href')
                  .indexOf(data.creator[i].url.slice(0, -1)) !== -1
              ) {
                name = $element.text().trim()
              }
            })
          } else {
            /* eslint-disable prefer-destructuring */
            name = data.creator[i].name
          }

          creators.push({
            link: data.creator[i].url,
            name,
          })
        }

        var summary = $('.summary_text').text().trim()
        var { description } = data
        var release = new Date(data.datePublished).getTime()
        var keywords = data.keywords.split(',')
        var runtimeArray = $('time[datetime]').text().split(' ')
        var runtime =
          parseInt(runtimeArray[runtimeArray.length - 2].trim()) * 60
        var trailer = {
          link: data.trailer.embedUrl,
          name: data.trailer.name,
        }
        var metascore = parseInt($('.metacriticScore').text().trim())
        var storyline = $('#titleStoryLine')
          .find('div.inline')
          .eq(0)
          .find('span')
          .text()
          .trim()
        var config = {
          id: titleID,
          name: title,
          link,
          year,
          img: poster,
          summary,
          description,
          storyline,
          certificate,
          rating,
          plot: summary,
          runtime,
          release,
          trailer,
          metascore,
          genres,
          actors,
          directors,
          creators,
          keywords,
        }
        var movie = new Movie(config)
        resolve(JSON.parse(JSON.stringify(movie)))
      })
  })
}

/**
 * Get Person details (TV stars, Directors etc.)
 *
 * @param  {String} nameID IMDb user ID e.g. nm0000175
 * @return {Object}
 */
function getPerson(nameID) {
  return new Promise((resolve) => {
    fetch(constants.IMDB.PERSON.replace('<nameID>', nameID))
      .then((response) => {
        return response.text()
      })
      .then((body) => {
        var $ = cheerio.load(body)
        var data = JSON.parse($('script[type="application/ld+json"]').html())
        var born = new Date(data.birthDate).getTime()
        var hometown = $('#name-born-info').find('a:nth-child(3)').text().trim()
        var heightStr = $('#details-height').text()
        var height = parseFloat(
          heightStr
            .substring(heightStr.lastIndexOf('(') + 1, heightStr.indexOf('m'))
            .trim()
        )
        var filmography = []
        $('#filmography')
          .find('.head')
          .each((i, element) => {
            var title = $(element).attr('data-category')
            var single = {
              title: $('#filmo-head-' + title)
                .find('a')
                .text()
                .trim(),
              items: [],
            }
            $(element)
              .next()
              .find('.filmo-row')
              .each((j, el) => {
                var _year = parseInt($(el).find('.year_column').text().trim())
                var _title = $(el).find('b a').text().trim()
                var _status = $(el).find('.in_production').text().trim()
                var _string = $(el).html()
                var _stringTwo = _string.substring(
                  _string.lastIndexOf('<br>') + 4,
                  _string.length
                )

                if (_stringTwo.indexOf('<div') !== -1) {
                  _stringTwo = _stringTwo.substring(
                    0,
                    _stringTwo.indexOf('<div')
                  )
                }

                var temp = {
                  year: _year,
                  title: _title,
                }

                if (!_.isEmpty(_status)) {
                  temp.status = _status
                }

                if (!_.isEmpty(_stringTwo.trim())) {
                  temp.meta = _stringTwo.trim()
                }

                single.items.push(temp)
              })
            filmography.push(single)
          })
        var config = {
          id: nameID,
          name: data.name,
          description: data.description,
          img: data.image,
          jobTitles: data.jobTitle,
          height,
          born,
          hometown,
          filmography,
        }
        var person = new Person(config)
        resolve(JSON.parse(JSON.stringify(person)))
      })
  })
}

module.exports = {
  getWatchlist,
  getList,
  getTitle,
  getPerson,
}
