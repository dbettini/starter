"use strict";

const router = require("express-promise-router")();

const authController = require("./auth.controller");
const { localMiddleware } = require("./passport");

router
  .get("/logout", authController.logout)
  .post("/login", localMiddleware, (req, res) => {
    // res.redirect("/"); // TODO: Probably not needed, just reroute on the client
    res.sendStatus(200);
  });

module.exports = router;
