const express = require('express');
const Account = require('./../../models/Account');


const router = express.Router();

router.get('/', (req, res) => {
  Account.find({}, (err, accounts) => {
    if (err) { return res.send(500); }
    return res.send(accounts);
  });
});

router.get('/:team_id', (req, res) => {
  const teamId = req.params.team_id;
  Account.findOne({ team_id: teamId }, (err, account) => {
    if (err) { return res.send(500); }
    return res.send(account);
  });
});

module.exports = router;
