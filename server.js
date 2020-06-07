const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});
const app = require("./app");
dotenv.config({ path: "./.env" });
const DB = process.env.DB.replace("<password>", process.env.DB_PASS);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Started"));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log("server started");
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
