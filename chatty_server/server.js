// server.js

const express = require('express');
const SocketServer = require('ws').Server;
// Generate a V1 UUID
const uuid = require('node-uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
// Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public')).listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({server});

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (client) => {
  console.log('Client connected');

  client.on('message', (rawMessage) => {
    let msg = JSON.parse(rawMessage);
    switch(msg.type) {
      case "postNotification":
      let newNotification = {
        type: "incomingNotification",
        data: {
          id: uuid.v1(),
          prevUserName: msg.data.prevUserName,
          newUserName: msg.data.newUserName
        }
      }
      wss.clients.forEach((client) => {
        if(client.readyState === require('ws').OPEN) {
          client.send(JSON.stringify(newNotification));
        }
      })
      break;
      case "postMessage":
      let newMessage = {
        type: "incomingMessage",
        data: {
          id: uuid.v1(),
          username: msg.data.username,
          content: msg.data.content
        }
      };
      wss.clients.forEach((client) => {
        if(client.readyState === require('ws').OPEN) {
          client.send(JSON.stringify(newMessage));
        }
      });
      break;
      default:
      console.error("This is an unknown event type: " + serverData.type);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => console.log('Client disconnected'));
});
