var express = require('express');
var app = express();
var compression = require('compression');
var fallback = require('express-history-api-fallback');
var root = __dirname + '/dist';

app.use(compression())

app.set('port', (process.env.PORT || 5000));

app.use(express.static(root))
app.use(fallback('index.html', { root: root }))

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
