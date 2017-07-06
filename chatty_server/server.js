// server.js

const express = require('express');
const SocketServer = require('ws').Server;
// Generate a V1 UUID
const uuid = require('node-uuid');

// Set the port to 3001
const PORT = process.env.PORT ? process.env.PORT : 3001;

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

  // Once a user is connected, counter is incremented and broadcast to all online users
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
    // Once a user is disconnect, counter is decremented and broadcast to all online users
    _decrementUser();
  });
});

// ************************ Helper Functions ************************ //

// Function: Broadcast the message to all clients
_broadcastmsg = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === require('ws').OPEN) {
      client.send(message);
    }
  });
}

// Function: Once a user is connected, counter is incremented and broadcast to all online users
_incrementUser = () => {
  counter++;
  let newCount = {
    type: "incomingCounter",
    data: counter
  }
  _broadcastmsg(JSON.stringify(newCount));
}

// Function: Once a user is disconnected, counter is decremented and broadcast to all online users
_decrementUser = () => {
  counter--;
  let newCount = {
    type: "incomingCounter",
    data: counter
  }
  _broadcastmsg(JSON.stringify(newCount));
}

// Function: Notifies all users that a user has changed their username
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

// Function: post message with user assigned color,
// enables users to send images and gifs.
_postMessage = (msg, color) => {
  // Find parts of the entered message that begins with
  // either http:// or https://, and ends with .jpg or .png, or .gif
  let regExp = new RegExp(/https?:\/{2}\S+?\.(jpg|png|gif)/gi);
  let urls = msg.data.content.match(regExp);
  console.log('The urls', urls);
  // Replaces all html characers with their associated entities
  msg.data.content = msg.data.content.replace(/[&<>"]/g, (tag) => {
    let chars = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&#34;',
      "'": '&#39;',
      ' ': '$nbsp;'
    };
    return chars[tag] || tag;
  });
  let newMessage = {
    type: "incomingMessage",
    data: {
      id: uuid.v1(),
      username: msg.data.username,
      // content: msg.data.content,
      color: color,
      content: urls ? _insertImage(msg.data.content, urls) : msg.data.content
    }
  };
  _broadcastmsg(JSON.stringify(newMessage));
}

// Function: converts and wraps url in an image tag,
// and places it in the message content
_insertImage = (content, urls) => {
  let regExp = new RegExp(urls.join('|'), 'gi');
  return content.replace(regExp, (chunk) => {
    if (chunk.match(regExp)) {
      return `<img src="${chunk}">`;
    }
  })
}
