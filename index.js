const express = require('express')
const cors = require('cors')
const constants = require('./src/constants')

const app = express()
const port = process.env.PORT || constants.PORT

const scraper = require('./src/scraper')

app.use(cors())

app.get('/watchlist/:userID', (req, res) => {
  scraper.getWatchlist(req.params.userID).then((data) => {
    res.json(data)
  })
})

app.get('/list/:listID/:page', (req, res) => {
  scraper.getList(req.params.listID, req.params.page).then((data) => {
    res.json(data)
  })
})

app.get('/title/:titleID', (req, res) => {
  scraper.getTitle(req.params.titleID).then((data) => {
    res.json(data)
  })
})

app.get('/name/:personID', (req, res) => {
  scraper.getPerson(req.params.personID).then((data) => {
    res.json(data)
  })
})

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening on port: ${port}`)
})

module.exports = app
