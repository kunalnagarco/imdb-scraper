module.exports = Object.freeze({
  IMDB: {
    BASE: 'https://www.imdb.com',
    LIST:
      'https://www.imdb.com/list/<listID>/?sort=date_added,desc&st_dt=&mode=detail&page=<pageNumber>',
    PERSON: 'https://www.imdb.com/name/<nameID>',
    TITLE: 'https://www.imdb.com/title/<titleID>',
    WATCHLIST:
      'https://www.imdb.com/user/<userID>/watchlist?sort=date_added%2Cdesc&view=detail',
  },
  PORT: 3000,
  TEST: {
    LIST_ID: 'ls057246838',
    USER_ID: 'ur39600768',
  },
})
