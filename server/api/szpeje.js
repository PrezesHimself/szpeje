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
    var szpejeId=req.query.szpejeId;
    var criteria = {};

    if(categoryId) {criteria.categoryId = categoryId}
    if(szpejeId) {criteria.id = szpejeId}

    if(categoryId || szpejeId) {
        Szpej.find(
            criteria,
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

// udpdate szpeje
app.post('/api/szpejeUpdate', function(req, res) {
    var data = [].concat(req.body)[0];

    Szpej.find(
        {id: data.id},
        function(err, todos) {
            Szpej.update(
                {id: data.id},
                {
                    src : data.src,
                    id : data.id,
                    categoryId : data.categoryId,
                    categoryName : data.categoryName,
                    caption_plain: data.caption_plain,
                    available: data.available,
                    json: JSON.stringify(data)
                },
                {upsert: true},
                function(err, updated) {

                    if (err) {
                        res.send(err);
                        }
                    res.json('szpeje were successfully updated.' );
                }
            );
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
