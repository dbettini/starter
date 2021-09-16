"use strict";

const { pick } = require("lodash");
const { hash } = require("bcrypt");

const Base = require("../Base.model");
const { auth: { passwordSaltRounds } } = require("../../config");

class Account extends Base {
  static get tableName() {
    return "account";
  }

  $formatJson(data) {
    const json = super.$formatJson(data);

    return pick(json, ["id", "email"]);
  }

  async hashPassword() {
    // password available only if it's part of the new object - `this` is not from database!
    if (this.password) {
      this.password = await hash(this.password, passwordSaltRounds);
    }
  }

  async $beforeInsert(options, queryContext) {
    await super.$beforeInsert(options, queryContext);
    await this.hashPassword();
  }

  async $beforeUpdate(options, queryContext) {
    await super.$beforeUpdate(options, queryContext);
    await this.hashPassword();
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "password"],
      properties: {
        id: { type: "string", format: "uuid" },
        email: { type: "string", format: "email", maxLength: 255 },
        password: { type: "string", minLength: 6 }, // Will get checked before hashing
        password_reset_token: { type: ["string", "null"], format: "uuid" },
        password_reset_expires_at: { type: ["string", "null"], format: "date-time" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }
}

module.exports = Account;
