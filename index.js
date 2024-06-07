var express = require('express');
var app = express();
app.use(express.static('public'));
var path = require('path');
var fs = require("fs");

var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({  extended: true }));


app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname,"index.html"));
})

app.get('/user', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       res.end( data );
    });
 })

 app.get('/user/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       res.end( JSON.stringify(user));
    });
 })

 app.post('/user', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = req.body.user4;
       users["user"+user.id] = user
       res.end( JSON.stringify(users));
    });
 })

 app.delete('/user/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var id = "user"+req.params.id;
       var user = data[id];
       delete data[ "user"+req.params.id];
       res.end( JSON.stringify(data));
    });
 })

 app.put("/user/:id", function(req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      
      var users = JSON.parse( data );
      var id = "user"+req.params.id;      
      users[id]=req.body;
      res.end( JSON.stringify(users));
   })
})


app.get('/hello', function (req, res) {
   res.send('Hello World');
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.post('/process_post', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
 })



 var server = app.listen(5000, function () {
    console.log("Express App running at http://127.0.0.1:5000/");
 })