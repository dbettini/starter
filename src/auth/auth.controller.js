"use strict";

function logout(req, res) {
  req.logout();
  // res.redirect("/"); // TODO: Probably not needed, just reroute on the client
  res.sendStatus(200);
}

module.exports = {
  logout,
};
