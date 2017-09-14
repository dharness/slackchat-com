const express = require('express');
const bodyParser = require('body-parser');
const Account = require('./../models/Account');
const querystring = require('querystring');


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));

const hasActiveSession = (req, res, next) => {
  if (req.session.teamId && req.session.teamId === req.params.team_id) {
    next();
  } else {
    res.redirect('/');
  }
};

router.get('/:team_id/dashboard/analytics', hasActiveSession, (req, res) => {
  const teamId = req.params.team_id;
  const openTab = req.query.tab || 'all';
  const selectedPage = 'analytics';
  const queryParams = querystring.stringify({
    chats: (openTab === 'all' || openTab === 'missed'),
    missed: (openTab === 'missed'),
  });
  const chartDataUrl = `${process.env.SLACKCHAT_API_URL}/visitors/${teamId}?${queryParams}`;
  Account.findOne({ team_id: teamId }).then((account) => {
    if (!account) { return res.sendStatus(404); }
    console.log(account);
    return res.render('dashboard/analytics', Object.assign(account, { openTab, chartDataUrl, selectedPage }));
  });
});

router.get('/:team_id/dashboard/widget', hasActiveSession, (req, res) => {
  const teamId = req.params.team_id;
  const selectedPage = 'widget';
  Account.findOne({ team_id: teamId }).exec().then((account) => {
    if (!account) { return res.sendStatus(404); }
    return res.render('dashboard/widget', Object.assign(account, { selectedPage }));
  });
});

router.get('/:team_id/dashboard/settings', hasActiveSession, (req, res) => {
  const teamId = req.params.team_id;
  const selectedPage = 'settings';
  Account.findOne({ team_id: teamId }).exec().then((account) => {
    if (!account) { return res.sendStatus(404); }
    return res.render('dashboard/settings', Object.assign(account, { selectedPage }));
  });
});

router.post('/:team_id/dashboard/settings', hasActiveSession, (req, res) => {
  const teamId = req.params.team_id;
  Account.findOneAndUpdate(
    { team_id: teamId },
    { settings: req.body },
    { upsert: false }, (err, account) => {
      if (err) { return res.send(500); }
      return res.redirect(`/${account.team_id}/dashboard/settings`);
    });
});

router.get('/:team_id/dashboard/payments', hasActiveSession, (req, res) => {
  const teamId = req.params.team_id;
  const selectedPage = 'payments';
  Account.findOne({ team_id: teamId }).exec().then((account) => {
    if (!account) { return res.sendStatus(404); }
    return res.render('dashboard/payments', Object.assign(account, { selectedPage }));
  });
});

module.exports = router;
