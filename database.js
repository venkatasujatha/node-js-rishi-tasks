const { DataSource } = require("typeorm");

require("dotenv").config();

const dataSource = new DataSource({
  type: process.env.name,
  host: process.env.host,
  port: process.env.port_ad,
  username: process.env.username,
  password: process.env.password,
  database: process.env.databaseName,
  entities: [
    "/home/tectoro/Downloads/sujtha/src/entity/*.js",
  ],
  migrations: ["migrations/*.js"],
  migrationsTableName: "postgres_migrations",
  cli: {
    entitiesDir: [
      "/home/tectoro/Downloads/sujtha/src/entity/*.js",
    ],
  },
  synchronize: true,
});

//export module

module.exports = { dataSource };
