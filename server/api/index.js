var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECT);

require('./mail');
require('./szpeje');
