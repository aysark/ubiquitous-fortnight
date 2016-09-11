var express = require('express');
var router = express.Router();

// HEURISTIC SCORING
var readingTime = require('reading-time');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
  username: '67bea8a7-3bfb-49d8-bae5-aa46e5e050f7',
  password: 'BSlVzlV3HsUZ',
  version_date: '2016-05-19'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/readingTime', function(req, res, next) {
  res.status(200).send(readingTime(req.query.text));
});

router.get('/toneAnalysis', function(req, res, next) {
  tone_analyzer.tone({ text: req.query.text },
    function(err, tone) {
      if (err)
        console.log(err);
      else
        test_data = JSON.stringify(tone, null, 2)
        test_data = JSON.parse(test_data)
        tone_categories = test_data['document_tone']['tone_categories']
        for(j = 0; j < tone_categories.length; j++){
            tone_category = tone_categories[j]
            for (i = 0; i < tone_category['tones'].length; i++) {
                    if(tone_category['tones'][i]['tone_id']=='agreeableness_big5')
                        res.status(200).send({'agreeableness_big5':tone_category['tones'][i]['score']});
            }}
  });
});

module.exports = router;
