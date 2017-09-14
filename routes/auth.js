const express = require('express');
const slackAuth = require('./../services/slackAuth');


const router = express.Router();

router.get('/signout', (req, res) => {
  slackAuth
    .signOut(req.query.token)
    .then(() => {
      req.session.destroy();
      res.redirect('/');
    });
});

module.exports = router;
