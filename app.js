const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const AppError = require("./util/appError");
const userRoutes = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");
const app = express();
app.use(logger("dev"));
app.use(cors());

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
