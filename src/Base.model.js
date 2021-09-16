"use strict";

const { Model, AjvValidator } = require("objection");
const { DbErrors } = require("objection-db-errors");

class Base extends DbErrors(Model) { // Maybe remove, not sure
}

module.exports = Base;
