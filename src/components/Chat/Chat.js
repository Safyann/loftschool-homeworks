import React from 'react';
import Message from '../Message';
import './Chat.css';

class Chat extends React.Component {
  state = { messages: [], messageInput: '' };

  messageList = React.createRef();

  changeInputMessage = event => {
    this.setState({ messageInput: event.target.value });
  };

  sendMessageOnEnter = event => {
    const { messageInput } = this.state;

    if (event.key !== 'Enter' || messageInput === '') {
      return;
    }

    this.setState(({ messages }) => {
      const newMessages = [...messages, { text: this.state.messageInput }];
      return {
        messages: newMessages,
        messageInput: ''
      };
    });
  };

  renderMessage = (msg, i) => <Message key={i} text={msg.text} />;

  componentDidUpdate = () => {
    this.messageList.current.scrollIntoView({
      block: 'end'
    });
  };

  render() {
    const { messages, messageInput } = this.state;

    return (
      <div className="chat">
        <div className="message-list">
          <div className="messages" ref={this.messageList}>
            {messages.map(this.renderMessage)}
          </div>
        </div>

        <input
          className="input-message"
          value={messageInput}
          onChange={this.changeInputMessage}
          onKeyPress={this.sendMessageOnEnter}
        />
      </div>
    );
  }
}

export default Chat;
