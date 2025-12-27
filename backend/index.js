const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require("./routes/routes");

const app = express();
dotenv.config({ path: "../.env" });
const PORT = process.env.BACKEND_PORT || 8080;

// basic middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// conn to db
mongoose
  .connect(process.env.MONGODB_CONN_STRING)
  .then(() => console.log("✅ db conn success"))
  .catch(() => console.log("❌ db conn failed"));

// establish routes
app.use("/", router);

// run server
app.listen(PORT, () => {
  console.log(`server active, port ${PORT}... 👂`);
});
