import fs from 'fs'
import { createServer } from 'node:http';
import { WebSocketServer } from 'ws'
import { createSchema, createYoga, createPubSub } from 'graphql-yoga';
import { useServer } from 'graphql-ws/lib/use/ws'

// resolvers
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";
import DateResolver from "./resolvers/Date.js";
import CategoryResolver from "./resolvers/Category.js";
// db
import http from 'http';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { WebSocket } from 'ws';
import db from './db.js';
import wsConnect from './wsConnect.js';

const pubSub = createPubSub();

const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync(
      './src/schema.graphql',
      'utf-8'
    ),
    resolvers: {
      Query,
      Mutation,
      Subscription,
      Date: DateResolver,
      Category: CategoryResolver,
    },
  }),
  context: {
    pubSub,
  },
  graphiql: {
    subscriptionsProtocol: 'WS'
  }
})

const httpServer = createServer(yoga)

const wsServer = new WebSocketServer({
  server: httpServer,
  path: yoga.graphqlEndpoint,
})

useServer(
  {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload
        })

      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe
        }
      }

      const errors = validate(args.schema, args.document)
      if (errors.length) return errors
      return args
    },
  },
  wsServer,
)

export default httpServer;

dotenv.config();
db.connect();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const webSockectServer = new WebSocket.Server({ server });
const dbConnection = mongoose.connection;

dbConnection.once('open', () => {
  console.log("MongoDB connected!");
  webSockectServer.on('connection', webSocketConnection => {
    console.log('Client connected');
    // wsConnect.initData(webSocketConnection);
    webSocketConnection.on('message', wsConnect.onMessage(webSocketConnection, webSockectServer));
    webSocketConnection.on('close', wsConnect.onClose(webSocketConnection));
  });
});

server.listen(port, () => {
  console.log(`GraphQL server listening on port ${port}.`);
});