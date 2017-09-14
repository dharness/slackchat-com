const express = require('express');
const Account = require('./../models/Account');
const slackAuth = require('./../services/slackAuth');
const dasboardController = require('./dashboard');
const apiController = require('./api');
const authController = require('./auth');
const winston = require('winston');


const router = express.Router();

router.use('/', dasboardController);
router.use('/api', apiController);
router.use('/auth', authController);

router.get('/', (req, res) => {
  if (req.session.teamId) {
    res.redirect(`/${req.session.teamId}/dashboard/analytics`);
  } else if (req.query.code) {
    slackAuth
      .getAccessToken(req.query.code)
      .then((accountInfo) => {
        Account.createOrUpdate(accountInfo).then(() => {
          req.session.teamId = accountInfo.team_id;
          req.session.save(() => {
            res.redirect(`/${accountInfo.team_id}/dashboard/analytics`);
          });
        });
      })
      .catch((err) => {
        winston.error(err);
        res.send(JSON.stringify(err));
      });
  } else {
    res.render('index.ejs');
  }
});

module.exports = router;
