import { constants } from './constants';
import Movie from './models/movie';
import Person from './models/person';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import _ from 'underscore';

/**
 * Get a user's watchlist
 *
 * @param  {String} userID e.g. ur39600768
 * @return {Object}
 */
export const getWatchlist = async (userID: string): Promise<void> => {
  return new Promise((resolve) => {
    fetch(constants.IMDB.WATCHLIST.replace('<userID>', userID))
      .then((response) => {
        return response.text();
      })
      .then((body) => {
        const a = body.match('IMDbReactInitialState.push((.*));');
        const [, b]: any = a && a[0].split('IMDbReactInitialState.push(');
        const listInfo = JSON.parse(b.slice(0, -2)).list;
        const c = JSON.parse(b.slice(0, -2)).titles;
        const data: any = {};
        const titles: string[] = [];
        _.each(c, (title) => {
          const config: any = {
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
          };
          _.each(title.credits.star, (star) => {
            config.stars.push({
              link: star.href,
              name: star.name,
            });
          });

          if (title.credits.creator) {
            config.creators = [];
            _.each(title.credits.creator, (creator) => {
              config.creators.push({
                link: creator.href,
                name: creator.name,
              });
            });
          }

          if (title.credits.director) {
            config.directors = [];
            _.each(title.credits.director, (director) => {
              config.directors.push({
                link: director.href,
                name: director.name,
              });
            });
          }

          const movie = new Movie(config);
          _.each(title.metadata.genres, (genre) => {
            config.genres.push(movie.buildGenre(genre));
          });
          titles.push(JSON.parse(JSON.stringify(movie)));
        });
        data.id = listInfo.id;
        data.name = listInfo.name;
        data.titles = titles;
        resolve(data);
      });
  });
};

/**
 * Get a user's list (public only)
 *
 * @param  {String} listID IMDb List ID e.g. ls057246838
 * @param  {Number} page   List page number e.g. 1
 * @return {Object}
 */
export const getList = async (listID: string, page: string): Promise<void> => {
  const movies: any = [];

  return new Promise((resolve) => {
    fetch(
      constants.IMDB.LIST.replace('<listID>', listID).replace(
        '<pageNumber>',
        page,
      ),
    )
      .then((response) => {
        return response.text();
      })
      .then((body) => {
        const $ = cheerio.load(body);
        const listName = $('.header.list-name').text();
        const [, listCreated] = $('#list-overview-created').text().split(' - ');
        const listPrivacyText = $('.privacy-overview').text().trim();
        let listPrivacy = false;

        if (listPrivacyText === 'Public') {
          listPrivacy = true;
        }

        const $listUser = $('#list-overview-summary > a');
        const [, listUserID]: any = ($listUser as any)
          .attr('href')
          .match(/user\/(.*)\//);
        const listUser = {
          id: listUserID,
          link: '/user/' + listUserID,
          name: $listUser.text(),
        };
        $('.lister-list .lister-item').each((i, element) => {
          const $that = $(element);
          const config: any = {};
          const $p = $that.find('p');
          const poster = $that.find('.lister-item-image img').attr('loadlate');
          const title = $that.find('.lister-item-header a').text();
          const href = $that.find('.lister-item-header a').attr('href');
          const [, id]: any = (href as any).match(/title\/(.*)\//);
          const link = '/title/' + id;
          const year = parseInt(
            $that
              .find('.lister-item-header .lister-item-year')
              .text()
              .slice(1, -1),
          );
          const rating = parseFloat(
            $that.find('.ipl-rating-star__rating').text(),
          );
          const metascore = parseInt($that.find('.metascore').text().trim());
          const certificate = $that.find('.certificate').text();
          const runtimeTotal = $that.find('.runtime').text().split(' ');
          const runtime = {
            val: parseInt(runtimeTotal[0]),
            unit: runtimeTotal[1],
          };
          const genres = [];
          const x = $that.find('.genre').text().trim().split(',');

          for (let q = 0; q < x.length; q++) {
            x[q] = x[q].trim();
            const _val = x[q].toLowerCase();
            genres.push({
              link: '/search/title?genres=' + _val,
              name: x[q],
            });
          }

          const summary = $that
            .find('.ipl-rating-widget')
            .nextAll('p')
            .first()
            .text()
            .trim();
          const directors: any = [];
          $($p.get(2))
            .children()
            .each((j, el) => {
              const $t = $(el);

              if ($t.is('a')) {
                const [, _id]: any = ($t as any)
                  .attr('href')
                  .match(/name\/(.*)\//);
                directors.push({
                  id: _id,
                  link: '/name/' + _id,
                  name: $t.text().trim(),
                });
              } else {
                return false;
              }
            });
          const stars: any = [];
          $($p.get(2))
            .find('.ghost')
            .nextAll('a')
            .each((j, el) => {
              const $t = $(el);

              if ($t.is('a')) {
                const [, _id]: any = ($t as any)
                  .attr('href')
                  .match(/name\/(.*)\//);
                stars.push({
                  id: _id,
                  link: '/name/' + _id,
                  name: $t.text().trim(),
                });
              }
            });
          const votes = parseInt(
            ($($p.get(3)).find('span[name="nv"]') as any)
              .eq(0)
              .attr('data-value'),
          );
          let gross: any = $($p.get(3))
            .find('span[name="nv"]')
            .eq(1)
            .attr('data-value');
          config.id = id;
          config.name = title;
          config.link = link;
          config.plot = summary;
          config.directors = directors;
          config.stars = stars;
          config.poster = poster;
          config.year = year;
          config.rating = rating;
          config.metascore = metascore;
          config.certificate = certificate;
          config.runtime = runtime;
          config.genres = genres;
          config.votes = votes;

          if (typeof gross !== 'undefined') {
            gross = parseInt(gross.replace(/,/g, ''));
            config.gross = gross;
          }

          const movie = new Movie(config);
          movies.push(movie);
        });
        resolve({
          id: listID,
          name: listName,
          link: '/list/' + listID,
          created: listCreated,
          public: listPrivacy,
          user: listUser,
          titles: movies,
        } as any);
      });
  });
};

/**
 * Get Title details (Movies, TV Shows etc.)
 *
 * @param  {String} titleID IMDb Title ID e.g. tt0111161
 * @return {Object}
 */
export const getTitle = (titleID: string): Promise<void> => {
  return new Promise((resolve) => {
    fetch(constants.IMDB.TITLE.replace('<titleID>', titleID))
      .then((response) => {
        return response.text();
      })
      .then((body) => {
        const $ = cheerio.load(body);
        const data = JSON.parse(
          ($('script[type="application/ld+json"]') as any).html(),
        );
        const title = data.name;
        const year = parseInt($('#titleYear').text().trim().slice(1, -1));
        const link = data.url;
        const poster = data.image;
        const rating = parseFloat($('span[itemprop="ratingValue"]').text());
        const genres = [];

        for (let i = 0; i < data.genre.length; i++) {
          genres.push({
            link: '/search/title?genres=' + data.genre[i].toLowerCase(),
            name: data.genre[i],
          });
        }

        const certificate = data.contentRating;
        const actors = [];

        for (let i = 0; i < data.actor.length; i++) {
          actors.push({
            link: data.actor[i].url,
            name: data.actor[i].name,
          });
        }

        const directors = [];

        if (Array.isArray(data.director)) {
          for (let i = 0; i < data.director.length; i++) {
            directors.push({
              link: data.director[i].url,
              name: data.director[i].name,
            });
          }
        } else {
          directors.push({
            link: data.director.url,
            name: data.director.name,
          });
        }

        const creators = [];

        for (let i = 0; i < data.creator.length; i++) {
          let name: any = '';

          if (typeof data.creator[i].name === 'undefined') {
            $('#titleDetails .txt-block a').each((j, element) => {
              const $element = $(element);

              if (
                ($element as any)
                  .attr('href')
                  .indexOf(data.creator[i].url.slice(0, -1)) !== -1
              ) {
                name = $element.text().trim();
              }
            });
          } else {
            /* eslint-disable prefer-destructuring */
            name = data.creator[i].name;
          }

          creators.push({
            link: data.creator[i].url,
            name,
          });
        }

        const summary = $('.summary_text').text().trim();
        const { description } = data;
        const release = new Date(data.datePublished).getTime();
        const keywords = data.keywords.split(',');
        const runtimeArray = $('time[datetime]').text().split(' ');
        const runtime =
          parseInt(runtimeArray[runtimeArray.length - 2].trim()) * 60;
        const trailer = {
          link: data.trailer.embedUrl,
          name: data.trailer.name,
        };
        const metascore = parseInt($('.metacriticScore').text().trim());
        const storyline = $('#titleStoryLine')
          .find('div.inline')
          .eq(0)
          .find('span')
          .text()
          .trim();
        const config: any = {
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
        };
        const movie = new Movie(config);
        resolve(JSON.parse(JSON.stringify(movie)));
      });
  });
};

/**
 * Get Person details (TV stars, Directors etc.)
 *
 * @param  {String} nameID IMDb user ID e.g. nm0000175
 * @return {Object}
 */
export const getPerson = async (nameID: string): Promise<void> => {
  return new Promise((resolve) => {
    fetch(constants.IMDB.PERSON.replace('<nameID>', nameID))
      .then((response) => {
        return response.text();
      })
      .then((body) => {
        const $ = cheerio.load(body);
        const data = JSON.parse(
          ($('script[type="application/ld+json"]') as any).html(),
        );
        const born = new Date(data.birthDate).getTime();
        const hometown = $('#name-born-info')
          .find('a:nth-child(3)')
          .text()
          .trim();
        const heightStr = $('#details-height').text();
        const height = parseFloat(
          heightStr
            .substring(heightStr.lastIndexOf('(') + 1, heightStr.indexOf('m'))
            .trim(),
        );
        const filmography: any = [];
        $('#filmography')
          .find('.head')
          .each((i, element) => {
            const title = $(element).attr('data-category');
            const single: any = {
              title: $('#filmo-head-' + title)
                .find('a')
                .text()
                .trim(),
              items: [],
            };
            $(element)
              .next()
              .find('.filmo-row')
              .each((j, el) => {
                const _year = parseInt(
                  $(el).find('.year_column').text().trim(),
                );
                const _title = $(el).find('b a').text().trim();
                const _status = $(el).find('.in_production').text().trim();
                const _string: any = $(el).html();
                let _stringTwo = _string.substring(
                  _string.lastIndexOf('<br>') + 4,
                  _string.length,
                );

                if (_stringTwo.indexOf('<div') !== -1) {
                  _stringTwo = _stringTwo.substring(
                    0,
                    _stringTwo.indexOf('<div'),
                  );
                }

                const temp: any = {
                  year: _year,
                  title: _title,
                };

                if (!_.isEmpty(_status)) {
                  temp.status = _status;
                }

                if (!_.isEmpty(_stringTwo.trim())) {
                  temp.meta = _stringTwo.trim();
                }

                single.items.push(temp);
              });
            filmography.push(single);
          });
        const config: any = {
          id: nameID,
          name: data.name,
          description: data.description,
          img: data.image,
          jobTitles: data.jobTitle,
          height,
          born,
          hometown,
          filmography,
        };
        const person = new Person(config);
        resolve(JSON.parse(JSON.stringify(person)));
      });
  });
};
