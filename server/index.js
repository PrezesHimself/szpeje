var express = require('express');
var app = module.exports = express();
var compression = require('compression');
var path = require('path');
var fallback = require('express-history-api-fallback');
var root = './dist';
// var auth = require('basic-auth');

var bodyParser = require('body-parser');


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
// app.use(function(req, res, next) {
//     var user = auth(req);
//
//     if (user === undefined || user['name'] !== 'szpeje' || user['pass'] !== 'goodday') {
//         res.statusCode = 401;
//         res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
//         res.end('Unauthorized');
//     } else {
//         next();
//     }
// });

app.set('port', (process.env.PORT || 5000));
app.use(compression());
app.use('/app', express.static(root));

app.get('/', function(req, res) {
    res.sendFile(path.resolve(root) + '/index.html');
});

require('./api/index.js');
require('./auth/index.js');

app.use(fallback('index.html', { root: root }));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
