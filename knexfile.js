const pgConnection = process.env.DATABASE_URL

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/community-concerns.db3'
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => conn.run("PRAGMA foreign_keys = ON", done)
    }
  },

  production: {
    client: 'pg',
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
  }
};
