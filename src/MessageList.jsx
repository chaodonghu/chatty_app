import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList />", this.props.messages);
    return (
      <div className="messages">
        {this.props.messages.map((message) => {
            if (message.username) {
              return (<Message key={message.id.toString()} username={message.username} content={message.content}/>);
            } else {
              return (<div key={message.id} className="message system">User {message.prevUserName} changed their name to {message.newUserName}</div>);
            }
          })}
      </div>
    );
  }
}

export default MessageList;
