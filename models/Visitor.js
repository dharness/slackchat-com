const mongoose = require('mongoose');


const visitorSchema = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  channelId: String,
  visitorId: String,
  teamId: String,
  lastConversation: {
    started: { type: Date, default: null },
    missed: { type: Boolean, default: false },
  },
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
