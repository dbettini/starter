"use strict";

const path = require("path");
const express = require("express");
const expressSession = require("express-session");
const router = require("express-promise-router")();
const helmet = require("helmet");
const config = require("../config");
const apiRouter = require("./api.router");
const authRouter = require("./auth/auth.router");
const { passportInitialize, passportSession } = require("./auth/passport");
const objection = require("../db/objection");
const { http: httpLogger, app: appLogger } = require("./loggers");

objection.init(config.databases.postgres);

const app = express();
const DIST_PATH = path.join(__dirname, "..", "dist"); // TODO: Or resolve?

app.use(express.static(DIST_PATH, { index: false }));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// TODO: Redis sessions
app.use(expressSession({ secret: config.app.sessionSecret }));
app.use(passportInitialize);
app.use(passportSession);
app.use(router);

router.use((req, res, next) => {
  httpLogger.info({ req });
  next();
});

router.use(authRouter);
router.use("/api", apiRouter);

router.get("*", (req, res) => {
  res.sendFile(path.join(DIST_PATH, "index.html"));
}); // Serve vue app

router.use((err, req, res, next) => { // Must have four arguments
  httpLogger.error({ error: err });

  // TODO: Match different error codes
  // res.sendStatus(500);
  throw err;
});

app.listen(config.app.port, () => {
  appLogger.info(`Listening at http://localhost:${config.app.port}`);
});
