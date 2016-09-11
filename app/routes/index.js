var express = require('express');
var router = express.Router();

// HEURISTIC SCORING
var readingTime = require('reading-time');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');

var tone_analyzer = new ToneAnalyzerV3({
  username: '67bea8a7-3bfb-49d8-bae5-aa46e5e050f7',
  password: 'BSlVzlV3HsUZ',
  version_date: '2016-05-19'
});

var alchemy_language = new AlchemyLanguageV1({
  api_key: 'b21292e04b69b33c36328b88b95b3f8f5355c03e'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/readingTime', function(req, res, next) {
  res.status(200).send(readingTime(req.query.text));
});

router.get('/clarityAnalysis', function(req, res, next) {
    var params = {
      text: req.query.text
    };
    alchemy_language.taxonomy(params, function (err, response) {
      if (err)
        console.log('error:', err);
      else
        data = response
        confidence = 0;
        if(data['taxonomy'][0]['score']>0.4 && data['taxonomy'].length<4){
                res.status(200).send({'clarity': 10*data['taxonomy'][0]['score']});
            }
            else{
                res.status(200).send({'clarity': 0});
        }
    });
  res.status(404)
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
