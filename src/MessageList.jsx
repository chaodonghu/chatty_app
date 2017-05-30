import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList />");
    return (
      <main className="messages">
        {
          this.props.messages.map((chatObj) => <Message key={chatObj.id} chattyUsername={chatObj.username} chattyMessage={chatObj.content}/>)
        }
      </main>
    );
  }
}

export default MessageList;
