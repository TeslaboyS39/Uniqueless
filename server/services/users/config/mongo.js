const { MongoClient } = require("mongodb");

// Define Uri
// const uri = "mongodb://localhost:27017"; // yang ini somehow gak bisa
const uri = "mongodb://127.0.0.1:27017";

// Define DB Name
const dbName = "uniqlessDB";

// Create instance of mongo client
const client = new MongoClient(uri);

let db;

async function connect() {
  try {
    // pastikan nodejs connect ke mongodb
    await client.connect();

    // assign db instance ke variable db
    db = client.db(dbName);
  } catch (error) {
    console.log(error);
  }
}

// fungsi untuk dapetin nilai terbaru db nya saat dipanggil
function getDb() {
  return db;
}

module.exports = { connect, getDb };
