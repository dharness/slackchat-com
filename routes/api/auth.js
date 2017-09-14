const express = require('express');


const router = express.Router();

router.post('/signup', (req, res) => {
  res.send({
    ok: 'lemmons'
  })
});

module.exports = router;
