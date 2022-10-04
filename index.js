const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || 3500;

const run = async () => {
  const app = express();

  app.use(cors({ origin: "*" }));
  const dbURI = process.env.MONGODB_URI;
  mongoose
    .connect(dbURI)
    .then(async (result) => {
      app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
      });

      app.use("/", routes);
    })
    .catch((error) => {
      console.log(error);
    });
};

run();
