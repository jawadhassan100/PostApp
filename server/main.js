const express = require("express");
const userRoute = require("./server/Route/routes");
const postRoute = require("./server/Route/routerPost");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv/config");

app.use(cors({
  origin:"https://post-app-bdmg.vercel.app"
}));
app.use(express.json());
const dbUrl = process.env.DATABASE_URL;

// Simple route to check if backend is working
app.get('/hello', (req, res) => {
  res.send('Hello World! The backend is running.');
});

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
  console.log(`Server is running on Port:${PORT}`);
});
