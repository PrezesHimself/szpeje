var app = require('../index.js');
var mongoose = require('mongoose');

// define model =================
var Szpej = mongoose.model('Szpej', {
    src : String,
    id : String,
    available : Boolean,
    categoryId : String,
    categoryName : String,
    caption_plain: String,
    json: String
});


// get szpeje
app.get('/api/szpeje', function(req, res) {

    var categoryId=req.query.categoryId;
    if(categoryId) {
        Szpej.find(
            {categoryId: categoryId},
            function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    } else {
        Szpej.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    }
});

// remove szpeje
app.delete('/api/szpeje', function(req, res) {
    Szpej.remove({}, function(err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos);
    });
});

app.post('/api/szpeje', function(req, res) {
    var data = [].concat(req.body);
    Szpej.insertMany(data, onInsert);

    function onInsert(err, docs) {
        if (err) {
            // TODO: handle error
        } else {
            res.json(docs.length + 'szpeje were successfully stored.' );
        }
    }
});
