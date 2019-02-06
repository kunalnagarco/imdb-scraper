module.exports = Object.freeze({
    PORT:                 3000,
    IMDB: {
        BASE:               'https://www.imdb.com',
        WATCHLIST:          'https://www.imdb.com/user/<userID>/watchlist?sort=date_added%2Cdesc&view=detail',
        LIST:               'https://www.imdb.com/list/<listID>/?sort=date_added,desc&st_dt=&mode=detail&page=<pageNumber>',
        TITLE:              'https://www.imdb.com/title/<titleID>',
        PERSON:             'https://www.imdb.com/name/<nameID>'
    },
    TEST: {
        LIST_ID: 'ls057246838',
        USER_ID: 'ur39600768'
    }
});
