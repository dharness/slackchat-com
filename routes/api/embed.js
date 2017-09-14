const express = require('express');
const Account = require('./../../models/Account');
const path = require('path');
const fs = require('fs');
const winston = require('winston');


const router = express.Router();
const rawBundle = fs.readFileSync(path.join(__dirname, '../../public', 'build', 'chindow.bundle.js'));

router.get('/:team_id/', (req, res) => {
  const teamId = req.params.team_id;

  Account.findOne({ team_id: teamId }).exec().then((account) => {
    if (account) {
      res.send(`window.SlackChat = {
        teamId: '${teamId}',
        teamName: '${account.team_name}',
        imageUrl: '${account.team.icon.image_34}'
      }; ${rawBundle}`);
    } else {
      res.sendStatus(404);
    }
  }).catch((err) => {
    winston.error(err);
  });
});

module.exports = router;
