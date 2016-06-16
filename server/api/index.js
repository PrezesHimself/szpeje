var mongoose = require('mongoose');

var config = require(process.env.NODE_ENV === 'production' ? './../config.prod.js' : './../config.js');

mongoose.connect(config.MONGODB_CONNECT);

require('./mail');
require('./szpeje');
