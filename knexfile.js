// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv').config();
const {DATABASE_URL} = process.env;
module.exports = {
  development: {
    client: 'pg',
    connection: DATABASE_URL,
  },
};
