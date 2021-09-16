"use strict";

require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV,
  app: {
    port: process.env.PORT,
    sessionSecret: process.env.SESSION_SECRET,
  },
  databases: {
    postgres: {
      client: "pg",
      debug: process.env.NODE_ENV === "development",
      connection: process.env.POSTGRES_URL || {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB_NAME,
        user: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        charset: "utf8",
      },
    },
  },
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET,
      expirationTime: process.env.JWT_EXPIRATION_TIME,
      verificationTime: process.env.JWT_VERIFICATION_TIME,
    },
    passwordSaltRounds: parseInt(process.env.PASSWORD_SALT_ROUNDS, 10),
  },
  api: {},
  client: {},
};
