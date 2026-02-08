import { Knex } from "knex";

const knex: Knex.Config = {
  client: "pg",
  connection: process.env.POSTGRES_CONN_STRING,
};

export default knex;
