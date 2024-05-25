import mongoose from "mongoose";
import "dotenv/config"

const url = process.env.MONGOURL;

async function connectToDB() {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Failed to connect to MongoDB", error));
}

async function disconnectFromDB() {
  mongoose
    .disconnect()
    .then(() => console.log("Disconnected from MongoDB"))
    .catch((error) =>
      console.error("Failed to disconnect from MongoDB", error)
    );
}

export { connectToDB, disconnectFromDB };
