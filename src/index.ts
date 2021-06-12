import express from 'express';
import cors from 'cors';
import { constants } from './constants';

import { getWatchlist, getList, getTitle, getPerson } from './scraper';

const app = express();
const port = process.env.PORT || constants.PORT;

app.use(cors());

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/watchlist/:userID', (req, res) => {
  getWatchlist(req.params.userID).then((data) => {
    res.json(data);
  });
});

app.get('/list/:listID/:page', (req, res) => {
  getList(req.params.listID, req.params.page).then((data) => {
    res.json(data);
  });
});

app.get('/title/:titleID', (req, res) => {
  getTitle(req.params.titleID).then((data) => {
    res.json(data);
  });
});

app.get('/name/:personID', (req, res) => {
  getPerson(req.params.personID).then((data) => {
    res.json(data);
  });
});

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening on port: ${port}`);
});

module.exports = app;
