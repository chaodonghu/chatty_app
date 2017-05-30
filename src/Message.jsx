import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message />");
    return (
      <div>
        <div className="message" key={this.props.index}>
          <span className="message-username">{this.props.chattyUsername}</span>
          <span className="message-content">{this.props.chattyMessage}</span>
        </div>
        <div className="message system">
        </div>
      </div>
    );
  }
}

export default Message;
