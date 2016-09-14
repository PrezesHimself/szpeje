var app = require('../index.js');

var apiKey = process.env.SENDGRID_APIKEY;
var sendgrid  = require('sendgrid')(apiKey);

app.post('/api/email', function(req, res) {
    var POST = req.body;
    console.log(POST);
    sendgrid.send({
      to:       'szpeje@yahoo.com',
      from:     POST.from,
      subject:  POST.subject,
      text:     POST.msg
    }, function(err, json) {
      if (err) {
          res.status(500).send('Something broke!');
          return console.error(err);
      }
      res.send('ok\n');
    });

});
