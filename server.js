var express = require("express");
var logfmt = require("logfmt");
var pg = require('pg');
var app = express();
var model = require("./model.js");
var Model= model.Model;

/*
Init Code
 */
app.use(logfmt.requestLogger());

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
    console.log("Listening on " + port);
});

/*
Postgresql DB Code
 */
var conString = "postgres://postgres:tito12@@@localhost/LLTalk";

var client = new pg.Client(conString);
client.connect(function(err) {
    if(err) {
        return console.error('could not connect to postgres', err);
    }
    //Test query returns current time
//    client.query('SELECT NOW() AS "theTime"', function(err, result) {
//        if(err) {
//            return console.error('error running query', err);
//        }
//        console.log(result.rows[0].theTime);
//        //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//        client.end();
//    });
});
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
    var query = "select * \
    from \"Talk\".\"Model\" \
    where model_dimension = "+req.params.dim+"\
        and model_sub_dimension = "+req.params.subdim+" and lid = "+req.params.lid;

    console.log("Query is "+ query);

    client.query(query, function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        //console.log(result.rows);

        var list = [];
        for(var i=0;i<result.rows.length;i++)       {
            //console.log(result.rows[i]);
            list[i] = new Model(result.rows[i].model_name,result.rows[i].model_dimension, result.rows[i].model_sub_dimension,result.rows[i].lid, result.rows[i].file_location)  ;
        }
        console.log(list);
        res.json(list);
    });
});



