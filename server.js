import WebSocket, { WebSocketServer } from 'ws';
import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

import {
  SwapServer
} from './swap-protocol/src/index.node.js';

function onKeydown() {
  return new Promise((resolve) => {
    const stdin = process.stdin;

    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    function onData(key) {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener("data", onData);
      resolve(key);
    }

    stdin.on("data", onData);
  });
}

const server = new SwapServer({ port: 8080, host: '0.0.0.0' });
const port = await server.start();
console.log("Press any key to exit.");
await onKeydown()
await server.stop();
