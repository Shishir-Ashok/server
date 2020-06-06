const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use(logger("dev"));
app.use(cors());

app.use(express.json());

app.use("/api/v1/users", userRoutes);

module.exports = app;
