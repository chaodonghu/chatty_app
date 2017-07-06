# Chatty-App

An application that allows users to have live conversations. Built with React, WebSockets and Express.

## Project Screenshots
![](./assets/chatty.gif)

## Features
* Each user is able to send a chat message that is broadcast to all connected users
* When a user changes their username, all connected users are notified of the username change
* Once a new user is connected, the 'users online' counter will be incremented
* Each user will have a color associated with their username, their color stays constant even on a username change.
* Connected users can paste urls ending with jpg, png, gif in a message to display images in the chat

## Usage

1. Clone this repository

2. Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```
3. Navigate to chatty_server directory in another terminal and start the chatty server on PORT 3001
```
cd chatty_server
node server.js http://localhost:3001
```

## Dependencies

* react
* react-dom
* webpack
* webpack-dev-server
* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-0
* css-loader
* eslint
* eslint-plugin-react
* node-sass
* sass-loader
* sockjs-client
* style-loader
