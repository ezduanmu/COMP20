const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dlee07:comp20@scores-qpnhf.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true }, { useNewUrlParser: true });

var mongo = require('mongodb');
var assert = require('assert');
var express = require('express');
var router = express.Router();
var url ='mongodb://localhost:27017/scores';
const app = express();
var http = require('http');
var server = http.Server(app);
var port =  process.env.PORT;
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/', function(req, res, next){
    res.sendFile(__dirname + '/game.html');
});
       
app.post('/post-feedback', function(req, res){
    console.log("hi " + req.body.player_name);
    console.log(" bye " + req.body.score);
});
console.log("Finished");
app.listen(port, function(){
  console.log('Listening on port ' + port); //Listening on port 8888
});


/*

client.connect(err=> {

          var doc = {
                          name: 'sam',//req.body.player_name,
                          score:'12'//req.body.score
          }
          
          const collection = client.db("scores").collection("game");

          collection.insertOne(doc, function(err, result){
          //assert.equal(null, err);
                console.log('item inserted');
          });
                  client.close();
});*/

module.exports = router;

