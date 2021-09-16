"use strict";

const program = require("commander");
const path = require("path");

const config = require("../config");
const { init } = require("../db/objection");
const initFunctions = require("../db/functions");

const MIGRATIONS_DIR = path.join(__dirname, "..", "db/migrations");
const knex = init({ ...config.databases.postgres, migrations: { directory: MIGRATIONS_DIR } });

/* eslint-disable no-use-before-define, no-console */
program
  .command("up")
  .description("Migrate to latest migrations.")
  .action(up);

program
  .command("make")
  .usage("-n <name>")
  .description("Create new empty migration with provided name and current timestamp")
  .option("-n,--name <name>", "Name of the migration")
  .action(make);

program
  .command("down")
  .description("Rollback the latest migration")
  .action(down);

program.parse(process.argv);

function exit(error) {
  console.error(error);
  program.outputHelp();
  process.exit(1);
}

async function up() {
  const dbName = knex.client.database();

  await initFunctions(knex);

  try {
    const [batchNo, log] = await knex.migrate.latest();

    if (log.length === 0) {
      console.log(`Database ${dbName} already up to date`);
    } else {
      console.log(`Batch ${batchNo} run on ${dbName}:
      ${log.length} migrations\n${log.join("\n")}\n`);
    }

    await knex.destroy();
  } catch (e) {
    exit(`Failed to migrate ${dbName} with error:\n${e}`);
  }
}

async function make() {
  const { name } = this.opts();

  if (typeof name !== "string") {
    exit("Name needed!");
  } else {
    const pathName = await knex.migrate.make(name);

    console.log(`Created at: ${pathName}`);
  }
}

async function down() {
  const dbName = knex.client.database();

  await initFunctions(knex);

  try {
    const [batchNo, log] = await knex.migrate.rollback();

    if (log.length === 0) {
      console.log(`Database ${dbName} already at the base migration`);
    } else {
      console.log(`Batch ${batchNo} rolled back: ${log.length} migrations \n`);
    }

    await knex.destroy();
  } catch (e) {
    exit(`Failed to rollback ${dbName} with error:\n${e}`);
  }
}
