var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/',  express.static(__dirname + '/app'));

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('*', function(req, res){
    res.render('index');
});
