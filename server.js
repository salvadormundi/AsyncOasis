import http from "node:http";
import express from "express";
import cors from "cors";
import {
  connectToDB,
  disconnectFromDB,
} from "./src/connections/mongooseconn.js";
import "dotenv/config";
import { user } from "./src/controllers/userRouter.js";

const app = express();
const PORT = process.env.SERVERPORT;
const disconnectInterval = process.env.SHUTDOWNINTERVAL;
await connectToDB();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use("/user", user);

const server = http.createServer(app);
server.listen(PORT, () => console.log(`server listening at port: ${PORT}`));

process.on("SIGINT", () => {
  console.log("closing http server");
  setInterval(() => {
    server.close(async () => {
      await disconnectFromDB();
      console.log("http server closed");
      process.exit(0);
    });
  }, disconnectInterval);
});
