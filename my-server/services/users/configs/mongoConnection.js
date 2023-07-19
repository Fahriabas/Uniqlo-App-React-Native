const { MongoClient } = require("mongodb");

const connectionString =
  "mongodb://fahriabas6969:VGakXX9wXegpngZb@ac-kmbuajc-shard-00-00.u61u6bm.mongodb.net:27017,ac-kmbuajc-shard-00-01.u61u6bm.mongodb.net:27017,ac-kmbuajc-shard-00-02.u61u6bm.mongodb.net:27017/?ssl=true&replicaSet=atlas-omzcs6-shard-0&authSource=admin&retryWrites=true&w=majority";

const elseConnectionString = 
  "mongodb+srv://fahriabas6969:VGakXX9wXegpngZb@cluster0.u61u6bm.mongodb.net/"

let db = null;

// Fungsi untuk koneksi ke db
const mongoConnect = async () => {
  const client = new MongoClient(connectionString);

  try {
    // client.db("nama-database-yang-akan-digunakan")
    const database = client.db("challange-2-f3");

    // Nilai variable global yang akan diset
    db = database;

    return database;
  } catch (err) {
    await client.close();
  }
};

const getDatabase = () => db;

module.exports = {
  mongoConnect,
  // Export getDatabase-nya
  getDatabase,
};
