const { MongoClient } = require("mongodb");

// exports.connectToDb = () => {
MongoClient.connect(
  "mongodb+srv://admin:poyEDNvZ7aJyO5n7@sekolah-app.adlep.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  async (err, client) => {
    // await client.connect();
    const db = client.db("uang-kas");
    // exports.users = db.collection("users");
    // exports.siswa = db.collection("siswa");
    // exports.kas = db.collection("kas");
    exports.bulan = db.collection("bulan");

    // exports.teachers = db.collection("teachers");
    // exports.tasks = db.collection("tasks");
    // exports.answer = db.collection("answers");
  }
);
// };
// mongodb://localhost:27017
// mongodb+srv://admin:poyEDNvZ7aJyO5n7@sekolah-app.adlep.mongodb.net/sekolah-app?retryWrites=true&w=majority
