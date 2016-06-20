var app = require('../index.js');
var mongoose = require('mongoose');

// define model =================
var Cateogory = mongoose.model('Cateogory', {
    name : String,
    uri : String
});

app.get('/api/categories', function(req, res) {
    Cateogory.find(function(err, todos) {
        if (err)
            res.send(err)
        res.json(todos);
    });
});

app.delete('/api/categories', function(req, res) {
    Cateogory.remove({_id:req.body._id}, function(err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos);
    });
});

app.put('/api/categories', function(req, res) {
    var data = [].concat(req.body);
    Cateogory.insertMany(data, onInsert);

    function onInsert(err, docs) {
        if (err) {
            // TODO: handle error
        } else {
            Cateogory.find({name:data[0].name},function(err, todos) {
                if (err) {
                    res.send(err)
                } else {
                    res.json(todos);
                }
            });
        }
    }
});
