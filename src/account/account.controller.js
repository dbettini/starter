"use strict";

function getAll(req, res) {
  res.json(["first", "second"]);
}

function getOne(req, res) {
  res.json({ id: req.params.id });
}

function getMe(req, res) {
  res.json(req.user);
}

module.exports = {
  getAll,
  getOne,
  getMe,
};
