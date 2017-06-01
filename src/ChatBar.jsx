import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props)

    //Get username
    this.state = {
      username: this.props.currentUser,
      content: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleContentSubmit.bind(this);
  }

  handleContentChange = (event) => {
    this.setState({content: event.target.value});
  }

  handleContentSubmit = (event) => {
    if (event.key === "Enter") {
      this.props.insertMessage(this.state);
      this.setState({content: ''})
    }
  }

  handleNameChange = (event) => {
    this.setState({username: event.target.value});
  }

  handleNameSubmit = (event) => {
    if (event.key === "Enter") {
      this.props.updateUser(this.state.username);
      this.setState({username: event.target.value});
    }
  }

  render() {
    console.log("Rendering <ChatBar />")
    let username = this.props.currentUser.username;

    return (
      <footer className="chatbar">
        <input className="chatbar-username" type="text" value={this.state.username} onChange={this.handleNameChange}
          onKeyPress={this.handleNameSubmit}
        />
        <input className="chatbar-message" type="text" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this.handleContentChange} onKeyPress={this.handleContentSubmit}/>
      </footer>
    );
  }
}

export default ChatBar;
