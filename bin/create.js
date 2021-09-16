"use strict";

const program = require("commander");

const config = require("../config");
const { init } = require("../db/objection");
const Account = require("../src/account/Account.model");

init(config.databases.postgres);

/* eslint-disable no-use-before-define, no-console */
program
  .command("user")
  .usage("-e <email> -p <password>")
  .description("Create a new user account in a specific tenant's database")
  .option("-e,--email <email>", "User email")
  .option("-p,--password <password>", "User password")
  .action(createUserAccount);

program.parse(process.argv);

async function createUserAccount() {
  try {
    const { email, password } = this.opts();

    await Account.query().insert({ email, password });
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
}
