"use strict";

const PromiseRouter = require("express-promise-router");
// const Boom = require("boom");

const account = require("./account/account.router");

const router = PromiseRouter();

router
  .use("/accounts", account);
// .use(() => { throw Boom.notFound(); });

module.exports = router;
