import mongoose from "mongoose";
import "dotenv/config";

const dbname = process.env.DBNAME;
const username = process.env.MONGOUSER;
const password = process.env.MONGOPASS;
const url = process.env.MONGOURL;

async function connectToDB() {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Failed to connect to MongoDB", error));
  // mongoose
  //   .connect(url, {
  //     user: username,
  //     pass: password,
  //     authSource: "Users",
  //     authMechanism: "DEFAULT",
  //     serverSelectionTimeoutMS: 5000,
  //     dbName: dbname,
  //   })
  //   .then(() => {
  //     console.log(`connected to mongodb database: ${dbname}`);
  //     mongoose.connection.on("disconnected", () =>
  //       console.log(`disconnected from database: ${dbname}`)
  //     );
  //     mongoose.connection.on("error", () => console.log("bando"));
  //   })
  //   .catch((err) => console.error(err));
}

async function disconnectFromDB() {
  mongoose
    .disconnect()
    .then(() => console.log("Disconnected from MongoDB"))
    .catch((error) =>
      console.error("Failed to disconnect from MongoDB", error)
    );
  // mongoose.connection
  //   .close(true)
  //   .then(() => console.log(`disconnected from database: ${dbname}`))
  //   .catch((err) => console.error(err));
}

export { connectToDB, disconnectFromDB };
