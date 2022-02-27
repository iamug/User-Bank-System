// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'user-bank',
      user: 'root',
      password: '',
    },
    migrations: {
      directory: './database/migrations/',
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations/',
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations/',
      tableName: 'knex_migrations',
    },
  },

  onInsertTrigger: (table, field) => `
  CREATE TRIGGER before_insert_${table}
  BEFORE INSERT ON ${table}
  FOR EACH ROW
  SET new.${field} = uuid();
  `,
};
