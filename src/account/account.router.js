"use strict";

const router = require("express-promise-router")();
const accountController = require("./account.controller");
const { BASIC } = require("../auth/authorizeMiddleware");

router
  .get("/me", BASIC, accountController.getMe)
  .get("/", accountController.getAll)
  .get("/:id", accountController.getOne);

module.exports = router;
