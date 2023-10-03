const express = require("express");
const app = express();
const port = process.env.PORT || 4001;
const cors = require("cors");
const router = require("./routes");
// const errorHandler = require("./middlewares/errorHandlers");

const { connect } = require("./config/mongo");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);

// error handler
// app.use(errorHandler);

// agar saat connect baru dia listen
connect().then((getDb) => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

module.exports = app;
