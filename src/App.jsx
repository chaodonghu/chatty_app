// Import jsx
import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

// Define application data
const chattyData = {
  currentUser: {username: "Dong"}, // optional, if currentuser is not defined, it means the user is Anonymous
  messages: [] //messages coming from the server will be stored here as they arrive
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = chattyData;
    this.handleInsertMessage = this.handleInsertMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    // Connects React app to WebSocket server
    this.connection = new WebSocket("ws://localhost:3001");
    this.connection.onopen = (event) => {
      console.log("We are connected");
    }
  }

sendMessage(message) {
  this.connection.send(JSON.stringify(message));
  console.log('Message sent from client to server');
}

handleInsertMessage = (message) => {
    let length = this.state.messages.length + 1;

    const newMessage = {id: length, username: message.username, content: message.content};
    const messages = this.state.messages.concat(newMessage);
    console.log(message);
    this.setState({messages: messages});
    // Messages going back and forth through the WebSocket connection
    this.sendMessage({message: message});
  }

  // in App.jsx
  componentDidMount() {
    console.log("componentDidMount <App />");
    // console.log('this is the length of the inputted data', chattyData.messages.length);
    setTimeout(() => {
      // console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} InsertMessage={this.handleInsertMessage}/>
      </div>
    );
  }
}

export default App;
