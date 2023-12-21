// require('dotenv').config();
const express = require('express');
const gameRouter = require('./games/games.router');
const recordsRouter = require('./records/records.router');
const app = express();

app.use('/games', gameRouter);
app.use('/records', recordsRouter);

module.exports = app;