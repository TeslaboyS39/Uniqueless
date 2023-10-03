const { MongoClient } = require("mongodb");

// Define Uri
// const uri = "mongodb://localhost:27017"; // yang ini somehow gak bisa
const uri = "mongodb://127.0.0.1:27017";

// Define DB Name
const dbName = "uniqlessDB";

// Create instance of mongo client
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db(dbName);

    // Define collection name
    const usersCollection = database.collection("users");

    // const findUser = await usersCollection.find().toArray();
    const findUser = await usersCollection.findOne({ username: "Foxtrot" });
    console.log(findUser);
  } catch (error) {
    console.log(error);
  }
}

run();
