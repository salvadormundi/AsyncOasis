import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import http from 'node:http';
import {
  connectToDB,
  disconnectFromDB,
} from './src/connections/Mongoose.connection.js';
import v1Router from './src/routes/v1/v1.js';

const app = express();
const PORT = process.env.SERVER_PORT;
const disconnectInterval = process.env.SHUTDOWN_INTERVAL;
await connectToDB();

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(helmet());

app.use('/api/v1', v1Router);

const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`server listening at port: ${PORT}`)
);

process.on('SIGINT', () => {
  console.log('closing http server');
  setInterval(() => {
    server.close(async () => {
      await disconnectFromDB();
      console.log('http server closed');
      process.exit(0);
    });
  }, disconnectInterval);
});
