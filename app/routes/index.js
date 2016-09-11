var express = require('express');
var router = express.Router();

// HEURISTIC SCORING
var readingTime = require('reading-time');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/readingTime', function(req, res, next) {
  res.status(200).send(readingTime(req.query.text));
});

module.exports = router;
