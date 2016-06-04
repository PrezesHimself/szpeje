var app = require('../index.js');
var mongoose = require('mongoose');
// define model =================
var Szpej = mongoose.model('Szpej', {
    text : String,
    done: Boolean
});


// get szpeje
app.get('/api/szpeje', function(req, res) {
    Szpej.find(function(err, todos) {
        if (err)
            res.send(err)
        res.json(todos);
    });
});

app.post('/api/szpeje', function(req, res) {

    Szpej.create({
        text : 'test',
        done : false
    }, function(err, todo) {
        if (err) {
            res.send(err);
        }
        Szpej.find(function(err, todos) {
            if (err)
                res.send(err)
                res.json(todos);
        });
    });
});
