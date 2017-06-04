import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message />");
    return (
        <div className="message" key={this.props.id}>
          <span className={`message-username ${this.props.color}`}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
    );
  }
}

export default Message;
