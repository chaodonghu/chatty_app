// server.js

const express = require('express');
const SocketServer = require('ws').Server;
// Generate a V1 UUID
const uuidV1 = require('uuid/v1');

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

  wss.broadcast = (data) => {
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(data));
      console.log('ID, Username and Content is being sent to client from servers')
    });
  };

  client.on('message', (rawMessage) => {
    const receivedMessage = JSON.parse(rawMessage);
    console.log('Received message:', receivedMessage);
    // receivedMessage.message['id'] = uuidV1();
    // console.log('Id has been addded to messsage: ', receivedMessage);
    wss.broadcast(receivedMessage);

    // console.log(`User ${message.username} said ${message.content}`);
  });

  client.on('message', (rawMessage) => {
    const message = JSON.parse(rawMessage);
    // console.log(message);
    console.log(`User ${message.message.username} said ${message.message.content}`);
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => console.log('Client disconnected'));
});
