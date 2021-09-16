"use strict";

const bunyan = require("bunyan");
const config = require("../config");

const http = bunyan.createLogger({
  name: "http",
  env: config.env,
  serializers: bunyan.stdSerializers,
});

const app = bunyan.createLogger({
  name: "app",
  env: config.env,
  serializers: bunyan.stdSerializers,
});

module.exports = {
  http,
  app,
};
