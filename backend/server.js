//start server

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const initRoutes = require("./routes/csv.routes");

global.__basedir = __dirname + "/..";

app.use(express.urlencoded({ extended: true }));
app.use(cors());
initRoutes(app);

db.sequelize.sync();

let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
