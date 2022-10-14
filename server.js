const { dataSource } = require("./database");
const bodyParser = require("body-parser");

const cors = require("cors");

const router = require("./src/router/routers");

const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", router);

require("dotenv").config();

app.use(cors());
//create function

async function run() {
  await dataSource.initialize();
  console.log(`datasource initialized.....`);

  //listining to server

  app.listen(process.env.port, () => {
    console.log(`server listening at port ${process.env.port}`);
  });
}

run();
