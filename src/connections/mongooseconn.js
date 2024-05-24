import mongoose from "mongoose";
import "dotenv/config";

const dbname = process.env.DBNAME;
const username = process.env.MONGOUSER;
const password = process.env.MONGOPASS;
const url = process.env.MONGOURL;
async function connectToDB() {
  mongoose
    .connect(url, {
      user: username,
      pass: password,
      authSource: "Users",
      authMechanism: "DEFAULT",
      serverSelectionTimeoutMS: 5000,
      dbName: dbname,
    })
    .then(() => {
      console.log(`connected to mongodb database: ${dbname}`);
      mongoose.connection.on("disconnected", () =>
        console.log(`disconnected from database: ${dbname}`)
      );
      mongoose.connection.on("error", () => console.log("bando"));
    })
    .catch((err) => console.error(err));
}

async function disconnectFromDB() {
  mongoose.connection
    .close(true)
    .then(() => console.log(`disconnected from database: ${dbname}`))
    .catch((err) => console.error(err));
}

export { connectToDB, disconnectFromDB };
