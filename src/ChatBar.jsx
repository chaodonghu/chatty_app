import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props)

    //Get username
    this.state = {username: this.props.currentUser.username, content: ''}

    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange = (event) => {
    this.setState({username: event.target.value});
  }

  handleContentChange = (event) => {
    this.setState({content: event.target.value});
  }

  handleSubmit = (event) => {
    if (event.key === "Enter") {
      this.props.InsertMessage(this.state);
      this.setState({content: ''})
    }
  }

  render() {
    console.log("Rendering <ChatBar />")
    let username = this.props.currentUser.username;

    return (
    <footer className="chatbar">
      <input className="chatbar-username" placeholder={username} value = {username} onChange={this.handleNameChange}/>
      <input className="chatbar-message" type="text" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this.handleContentChange} onKeyPress={this.handleSubmit}/>
    </footer>
    );
  }
}

export default ChatBar;
