const express = require("express");
const fs = require("fs");
const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());

const routesPath = "./routes";

fs.readdirSync(routesPath).forEach(function (file) {
  if (~file.indexOf(".js")) {
    let route = require(routesPath + "/" + file);
    route.setRouter(app);
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}/`);
});
