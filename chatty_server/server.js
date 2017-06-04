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

// Start user counter at 0
let counter = 0;

// Set total number of possible user colors to 5.
let colorTotal = 5;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (client) => {
  console.log('Client connected');
  _incrementUser();

  client.on('message', (rawMessage) => {
    let msg = JSON.parse(rawMessage);
    switch (msg.type) {
      case "postColor":
      // Assign a random color out of 5 preset colors to user
      client.color = `name-${Math.floor(Math.random() * colorTotal + 1)}`;
      break;
      case "postNotification":
        _postNotification(msg);
        break;
      case "postMessage":
        _postMessage(msg, client.color);
        break;
      default:
        console.error("This is an unknown event type: " + msg.type);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    console.log('Client disconnected');
    _decrementUser();
  });
});

// ************************ Helper Functions ************************ //

// Broadcast the message to all clients
_broadcastmsg = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === require('ws').OPEN) {
      client.send(message);
    }
  });
}

_incrementUser = () => {
  counter++;
  let newCount = {
    type: "incomingCounter",
    data: counter
  }
  _broadcastmsg(JSON.stringify(newCount));
}

_decrementUser = () => {
  counter--;
  let newCount = {
    type: "incomingCounter",
    data: counter
  }
  _broadcastmsg(JSON.stringify(newCount));
}

_postNotification = (msg) => {
  let newNotification = {
    type: "incomingNotification",
    data: {
      id: uuid.v1(),
      prevUserName: msg.data.prevUserName,
      newUserName: msg.data.newUserName
    }
  }
  _broadcastmsg(JSON.stringify(newNotification));
}

_postMessage = (msg, color) => {
  let newMessage = {
    type: "incomingMessage",
    data: {
      id: uuid.v1(),
      username: msg.data.username,
      content: msg.data.content
    }
  };
  _broadcastmsg(JSON.stringify(newMessage));
}
