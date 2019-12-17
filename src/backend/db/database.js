const mongoose = require("mongoose");

const dbUrl =
  "mongodb+srv://wasim:wasim@cluster0-athqt.mongodb.net/OnlineExam?retryWrites=true&w=majority";

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

const initDb = db => {
  connection.on("connected", () => {
    console.log(db, "Database connected Successfully...");
  });

  connection.on("disconnected", () => {
    console.log(db, "Disconnected from DB");
  });

  connection.on("error", err => {
    console.log(db, "Error in connecting MEAN DB", err);
  });
};

// module.exports = connection;
module.exports = { initDb: initDb };
