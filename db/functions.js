"use strict";

module.exports = (knex) => knex.schema
  .raw(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
  .raw(`
    CREATE OR REPLACE FUNCTION refresh_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
    NEW.updated_at = now();
    RETURN NEW;
    END;
    $$ LANGUAGE 'plpgsql';`);
