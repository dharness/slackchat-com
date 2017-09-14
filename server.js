require('dotenv').config();
const app = require('express')();
const PORT = process.env.PORT || 9091;
const server = require('http').Server(app);
const io = require('socket.io')(server);
const messageBrokers = require('./messaging');
const connectDb = require('./services/connections').connect;
const Account = require('./models/Account');
const winston = require('winston');
const fs = require('fs');

const chindowBundle = fs.readFileSync(__dirname + '/chindow/chindow.bundle.js');

app.get('/embed/:accountId', async (req, res) => {
  const account = await Account.findOne({_id: req.params.accountId }).exec();
  const prefix = `
    window.__SLACKCHAT_DATA = {
      teamName: '${account.slack.team.name}',
      teamId: '${account.slack.team.id}',
      imageUrl: '${account.slack.imgUrl}'
    }
  `;
  res.set({"Content-Disposition":"attachment; filename=\"chindow.bundle.js\""});
  res.send(prefix + chindowBundle);
});

app.get('/example', (req, res) => {
  res.sendFile(__dirname + '/chindow/index.html');
});

const start = async () => {
  await connectDb();
  const botTokens = await Account.find().distinct('slack.accessToken').exec();
  messageBrokers.init(io, botTokens);
  server.listen(PORT, () => {
    console.log(`COM-SERVER listening atll http://localhost:${PORT}`)
  });
}

start();