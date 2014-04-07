var express = require("express");
var logfmt = require("logfmt");
var pg = require('pg');
var app = express();
var model = require("./model.js");
var Model= model.Model;
var MongoClient = require('mongodb').MongoClient;

/*
Init Code
 */
app.use(logfmt.requestLogger());

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
    console.log("Listening on " + port);
});

/*
Mongo DB Code
 */

var uri = 'mongodb://pedro:tito1234@ds047057.mongolab.com:47057/lltalk';


/*
Server Code
 */

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.post('/upload/:name/:dim/:subdim/:lid/:location', function(req, res) {
    //Method to upload and add to db
});

app.get('/search/:name/:dim/:subdim/:lid', function(req, res){
    console.log("Query is ");
    res.send('Hello '+req.params.query);
});

app.get('/search/:dim/:subdim/:lid', function(req, res){
    MongoClient.connect(uri, function(err, db) {

        if (err) {
            throw err;
        }
        var model = db.collection('Model');
        var dimension = parseInt(req.params.dim);
        var subdimension = parseInt(req.params.subdim);
        var lid = stringtobool(req.params.lid.toUpperCase());
        var modelList = [];
        model.find({model_dimension:dimension, model_sub_dimension:subdimension,lid:lid}).toArray(function (err, results) {
            console.log(results);
            var list = [];
            var i =0;
            results.forEach(function (item) {
                var model = new Model(item['model_name'],item['model_dimension'],item['model_sub_dimension'],item['lid'],item['file_location'])
                list[i] = model;
                i++;
            });
            console.log(list);
            res.json(list);
        })

    });
});
//    client.query(query, function(err, result) {
//        if(err) {
//            return console.error('error running query', err);
//        }
//        //console.log(result.rows);
//
//        var list = [];
//        for(var i=0;i<result.rows.length;i++)       {
//            //console.log(result.rows[i]);
//            list[i] = new Model(result.rows[i].model_name,result.rows[i].model_dimension, result.rows[i].model_sub_dimension,result.rows[i].lid, result.rows[i].file_location)  ;
//        }
//        console.log(list);
//        res.json(list);
//    });

//    pg.connect(process.env.DATABASE_URL, function(err, client2) {
////        var query = client2.query('SELECT * FROM your_table');
////        query.on('row', function(row) {
////            console.log(JSON.stringify(row));
////        });
//        client2.query(query, function(err, result) {
//            if(err) {
//                return console.error('error running query', err);
//            }
//            //console.log(result.rows);
//
//            var list = [];
//            for(var i=0;i<result.rows.length;i++)       {
//                //console.log(result.rows[i]);
//                list[i] = new Model(result.rows[i].model_name,result.rows[i].model_dimension, result.rows[i].model_sub_dimension,result.rows[i].lid, result.rows[i].file_location)  ;
//            }
//            console.log(list);
//            res.json(list);
//        });
//
//    });


function stringtobool(string){
    switch(string.toLowerCase()){
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }
}

