import http from 'http';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { WebSocket } from 'ws';
import db from './db.js';
import wsConnect from './wsConnect.js';

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
  console.log(`Http server listening on port ${port}.`);
});