import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Launcher} from 'react-chat-window';
import messageBroker from './messageBroker';


class App extends Component {

  constructor() {
    super();
    this.state = { messages: [] };
    this.messageBroker = messageBroker;
    this.messageBroker.init();
  }

  render() {
    return (<div>
      <Launcher
      agentProfile={{
        teamName: 'react-live-chat',
        imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
      }}
      onMessageWasSent={()=>{}}
      messageList={[]}
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
