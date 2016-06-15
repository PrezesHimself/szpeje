var mongoose = require('mongoose');
var config = require('./../config.js');

mongoose.connect(config.MONGODB_CONNECT);

require('./mail');
require('./szpeje');
