var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello World!');
});
app.get('/search/:query', function(req, res){
    console.log("Query is "+req.param.query);
    res.send('Hello '+req.params.query);
});
app.get('/cat',function(req,res){
    res.send('In cat');
});
var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log("Listening on " + port);
});