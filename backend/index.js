const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require("./routes/routes");

const app = express(); // init express
dotenv.config({ path: "../.env" }); // bring in .env
const PORT = process.env.BACKEND_PORT || 8080; // establish port

// connect to db
mongoose
  .connect(process.env.MONGODB_CONN_STRING)
  .then(() => console.log("✅ db conn success"))
  .catch(() => console.log("❌ db conn failed"));

// basic middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // exact frontend URL
    credentials: true,
  })
);

// establish routes
app.use("/", router);

// run server on port
app.listen(PORT, () => {
  console.log(`server active, port ${PORT}... 👂`);
});
