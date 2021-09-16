"use strict";

const knex = require("knex");
const { Model } = require("objection");

function init(config) {
  Model.knex(knex(config));

  return Model.knex();
}

module.exports = { init };
