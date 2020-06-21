var express = require('express');
var router = express.Router();
var nexmo = require('nexmo');

nexmo = new nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET,
  }
)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

function handleInsight(request, response) {
  console.log("params", Object.assign(request.query, request.body))
  response.status(204).send();
}

router.post('/webhooks/insight', handleInsight)

router.post('/', function (req, res) {
  const number = req.body.number;
  const level = req.body.level;
  nexmo.numberInsight.get({
    level: level,
    number: number,
    callback: `${req.protocol}://${req.get('host')}/webhooks/insight`
  }, function (error, insight) {
    if (error) {
      console.log(error);
    } else {
      res.send(insight);
    }
  });

});
module.exports = router;
