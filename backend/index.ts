// initialize env variables from .env file
import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { resolvers, typeDefs } from './graphqlconfig';

// Connect to MongoDB using Mongoose
const mongoUser = process.env.MONGO_USER; // backendadmin
const mongoPass = process.env.MONGO_PASS; // WpMgnveVRqRn52wu
const mongoCluster = process.env.MONGO_CLUSTER; // main-ktrlu.mongodb.net
const dbName = process.env.MONGO_DB_NAME; // test
const mongoURI = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoCluster}/${dbName}?retryWrites=true&w=majority`;

console.log(`[DB]: Connecting to MongoDB cluster: ${mongoCluster}...`);
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log('[DB]: MongoDB connection established.');
  })
  .catch((err: Error) => {
    console.log(`[DB]: Mongoose connection error: ${err}`);
  });

// Create Express server and enable CORS
const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

// Listen
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    `[Express]: Server ready at http://localhost:${port}${server.graphqlPath}`,
  );
});
