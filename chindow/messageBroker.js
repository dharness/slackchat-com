import MESSAGE_TYPES from './../messaging/messageTypes';
import io from 'socket.io-client';
const CLIENT = MESSAGE_TYPES.CLIENT;
const BROKER = MESSAGE_TYPES.BROKER;
const SOCKET_URL = process.env.SC_SOCKET_URL;


console.log(MESSAGE_TYPES);

const messageBroker = {

  init() {
    const socket = io();
    this.socket = socket;
    this.messageRecievedHandlers = [];
    socket.on(BROKER.VISITOR_ID, this.setVisitorId);
    socket.on(BROKER.MESSAGE, this.handleIncomingMessage.bind(this));
    const visitorId = this.getVisitorId();
    const teamId = this.getTeamId();

    if (!visitorId) {
      socket.emit(CLIENT.NEW_VISITOR, { teamId });
    } else { socket.emit(CLIENT.RETURNING_VISITOR, { visitorId, teamId }); }
  },

  sendMessage(message) {
    message.visitorId = this.getVisitorId();
    message.teamId = this.getTeamId();
    this.socket.emit(CLIENT.MESSAGE, message);
  },

  handleIncomingMessage(message) {
    this.messageRecievedHandlers.forEach(handle => handle(message));
  },

  onMessageReceived(handler) {
    this.messageRecievedHandlers.push(handler);
  },

  getVisitorId() {
    return localStorage.getItem('SLACKCHAT.VISITOR_ID');
  },

  getTeamId() {
    return window.__SLACKCHAT_DATA.teamId;
  },

  getTeamName() {
    return window.__SLACKCHAT_DATA.teamName;
  },

  getImageUrl() {
    return window.__SLACKCHAT_DATA.imageUrl;
  },

  setVisitorId(data) {
    localStorage.setItem('SLACKCHAT.VISITOR_ID', data.visitorId);
  }
};

export default messageBroker;