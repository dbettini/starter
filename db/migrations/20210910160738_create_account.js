"use strict";

// TODO: Rename file timestamp
// TODO: Rename file to account
exports.up = (knex) => knex.schema
  .createTable("account", (t) => {
    t.uuid("id").defaultTo(knex.raw("uuid_generate_v1()")).primary();
    t.string("email").notNullable().unique();
    t.string("password").notNullable();
    t.uuid("password_reset_token").unique();
    t.timestamp("password_reset_expires_at");
    t.timestamps(false, true);
  })
  // TODO: Use spi instead https://dba.stackexchange.com/questions/158743/postgresql-auto-update-updated-at-with-custom-column
  .raw(`
    CREATE TRIGGER refresh_updated_at_trigger BEFORE UPDATE ON account FOR EACH ROW
    EXECUTE PROCEDURE refresh_updated_at();`);

exports.down = (knex) => knex.schema.dropTable("account");
