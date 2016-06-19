var app = require('../index.js');
var mongoose = require('mongoose');

// define model =================
var Cateogory = mongoose.model('Cateogory', {
    name : String,
    id : String,
});


// get szpeje
app.get('/api/categories', function(req, res) {
    Cateogory.find(function(err, todos) {
        if (err)
            res.send(err)
        res.json(todos);
    });
});

// remove szpeje
app.delete('/api/categories', function(req, res) {
    var categoryId=req.query.categoryId;
    Cateogory.remove({id:categoryId}, function(err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos);
    });
});

app.post('/api/categories', function(req, res) {
    var data = [].concat(req.body);
    Cateogory.insertMany(data);
});
