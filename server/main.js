const express = require("express");
const userRoute = require("./server/Route/routes");
const postRoute = require("./server/Route/routerPost");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv/config");

app.use(cors());
app.use(express.json());
const dbUrl = process.env.DATABASE_URL;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((e) => {
    console.log(e);
  });
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
