// console.log('env', process.env.NODE_ENV);
const config = require('../knexfile')[process.env.NODE_ENV];
const db = require('knex')(config);

module.exports = db;