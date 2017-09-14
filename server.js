require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9091;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const messageBrokers = require('./messaging');
const connectDb = require('./services/connections').connect;
const Account = require('./models/Account');
const winston = require('winston');


app.get('/embed', (req, res) => {
  res.sendFile(__dirname + '/chindow/chindow.bundle.js');
});

const start = async () => {
  await connectDb();
  const botTokens = await Account.find().distinct('slack.accessToken').exec();
  messageBrokers.init(io, botTokens);
  app.listen(PORT, () => {
    console.log(`COM-SERVER listening atll http://localhost:${PORT}`)
  });
}

start();