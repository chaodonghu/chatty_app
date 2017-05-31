// Import jsx
import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

// Define application data
const chattyData = {
  currentUser: {username: "Dong"}, // optional, if currentuser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Dong",
      content: "Has anyone seen my marbles?"
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}

content = ''
class App extends Component {
  constructor(props) {
    super(props);
    this.state = chattyData;
  }

InsertMessage = (message) => {
    console.log('this is the length of the inputted data', chattyData.messages.length);
    let length = this.state.messages.length + 1;
    console.log(length);

    const newMessage = {id: length, username: message.username, content: message.content};
    const messages = this.state.messages.concat(newMessage);
    console.log(messages);
    this.setState({messages: messages})
  }

  // in App.jsx
  componentDidMount() {
    console.log("componentDidMount <App />");
    // console.log('this is the length of the inputted data', chattyData.messages.length);
    setTimeout(() => {
      console.log("Simulating incoming message");
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
        <ChatBar currentUser={this.state.currentUser} InsertMessage={this.InsertMessage}/>
      </div>
    );
  }
}

export default App;
