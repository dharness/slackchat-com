import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Launcher } from 'react-chat-window';
import messageBroker from './messageBroker';


class App extends Component {

  constructor() {
    super();
    this.state = { messages: [] };
    this.messageBroker = messageBroker;
    this.messageBroker.init();
    this.messageBroker.onMessageReceived(this.onMessageReceived.bind(this));
    this.onMessageWasSent = this.onMessageWasSent.bind(this);
  }

  onMessageReceived(message) {
    console.log(message)
    this.setState({
      messages: [...this.state.messages, {
        author: message.author,
        type: 'text',
        data: {
          text: message.body
        }
      }]
    });
  }

  onMessageWasSent(message) {
    console.log(message)
    this.messageBroker.sendMessage(message);
    this.setState({
      messages: [...this.state.messages, message]
    });
  }

  render() {
    return (<div>
      <Launcher
      agentProfile={{
        teamName: 'react-live-chat',
        imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
      }}
      onMessageWasSent={this.onMessageWasSent}
      messageList={this.state.messages}
      />
    </div>);
  }
}

const launcherDiv = document.createElement('div');
launcherDiv.id = 'slackchat-launcher';
document.body.appendChild(launcherDiv);

ReactDOM.render((
  <App />
), document.querySelector('#slackchat-launcher'))
