var express = require('express');
var app = express();
var compression = require('compression');
var fallback = require('express-history-api-fallback');
var root = __dirname + '/dist';
var auth = require('basic-auth');
var apiKey = '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';
var sendgrid  = require('sendgrid')(apiKey);
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    var user = auth(req);

    if (user === undefined || user['name'] !== 'szpeje' || user['pass'] !== 'goodday') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
        res.end('Unauthorized');
    } else {
        next();
    }
});

app.set('port', (process.env.PORT || 5000));
app.use(compression());
app.use('/app', express.static(root));
app.use(fallback('index.html', { root: root }));

app.post('/api/email', function(req, res) {
    var POST = req.body;
    console.log(POST);
    sendgrid.send({
      to:       'mateuszrorat@gmail.com',
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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
