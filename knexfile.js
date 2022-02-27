const dotenv = require('dotenv');
dotenv.config();

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      database: 'user-bank',
      user: 'root',
      password: '',
    },
    migrations: {
      directory: './database/migrations/',
      tableName: 'knex_migrations',
    },
  },

  testing: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      database: 'user-bank-tests',
      user: 'root',
      password: '',
    },
    migrations: {
      directory: './database/migrations/',
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'mysql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations/',
    },
  },

  onInsertTrigger: (table, field) => `
  CREATE TRIGGER before_insert_${table}
  BEFORE INSERT ON ${table}
  FOR EACH ROW
  SET new.${field} = uuid();
  `,
};
