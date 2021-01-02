const pgConnection = process.eventNames.DATABASE_URL || "postgres://ynjyltyccovkyi:3785652e74fe7d63922e0a6145582f6f5727bffc509cb02057e8627988562807@ec2-3-232-240-231.compute-1.amazonaws.com:5432/ddh3n7doh09lgv"

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

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
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
