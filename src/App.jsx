// Import jsx
import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  // Connects React app to WebSocket server
  connectSocket = new WebSocket("ws://localhost:3001", "protocolOne");

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { username: "Dong"}, // optional, if currentuser is not defined, it means the user is Anonymous
      messages: [], //messages coming from the server will be stored here as they arrive
    };
  }

  // this.handleInsertMessage = this.handleInsertMessage.bind(this);
  // // this.sendMessage = this.sendMessage.bind(this);
  // this.componentDidMount = this.componentDidMount.bind(this);

  // in App.jsx
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.connectSocket.onmessage = (event) => {
      console.log('Received: ', event.data);
      const serverData = JSON.parse(event.data);
      console.log('Data coming back from server to client', serverData);
      switch (serverData.type) {
        case "incomingNotification":
          this.setState((prevState) => {
            prevState.messages.push(serverData.data);
            this.setState({messages: prevState.messages});
          });
          break;
        case "incomingMessage":
          this.setState((prevState) => {
            prevState.messages.push(serverData.data);
            this.setState({messages: prevState.messages});
          });
          break;
          case "incomingCounter":
          console.log("Change counter", serverData.data);
          this.setState({counter: serverData.data});
          break;
        default:
          console.error("This is an unknown event type: " + serverData.type);
      }
    }
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className=".navbar-counter">{this.state.counter} users online</span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.username} updateUser={this.handleUpdateUser} insertMessage={this.handleInsertMessage}/>
      </div>
    );
  }

  handleUpdateUser = (username) => {
    const newMessage = {
      type: "postNotification",
      data: {
        prevUserName: this.state.currentUser.username,
        newUserName: username
      }
    };
    this.connectSocket.send(JSON.stringify(newMessage));
    this.setState({currentUser: {username: username}});
  }

  handleInsertMessage = (message) => {
    const newMessage = {
      type: "postMessage",
      data: {
        username: message.username,
        content: message.content
      }
    };
    // Messages going back and forth through the WebSocket connection
    this.connectSocket.send(JSON.stringify(newMessage));
  }
}

export default App;
