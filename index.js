var express = require('express');
var app = express();
app.use(express.static('public'));
var path = require('path');
var fs = require("fs");
// mongodb://localhost:27017/
const { MongoClient } = require('mongodb');

/*
var mysql = require('mysql');
var con = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "mydb123"
});

var qry =`
SELECT 
   m.member_id, 
   m.name AS member, 
   c.committee_id, 
   c.name AS committee
FROM
   members m
INNER JOIN committees c ON c.name = m.name;
`;
con.connect(function (err) {
   if (err) throw err;
   console.log("Connected!");
   con.query(qry, function (err, results) {
      if (err) throw err;
      results.forEach((row) => {
         console.log(JSON.stringify(row));
      });
   });

   con.end();
});

*/ 

// mongodb://localhost:27017/
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);



// Database Name
const dbName = 'myProject';

async function main(){

   const uri = "mongodb://localhost:27017/";

   const client = new MongoClient(uri);

   try {
      // Connect to the MongoDB cluster
      await client.connect();
        
      await newcollection(client, "mydatabase");
   } finally {
      // Close the connection to the MongoDB cluster
      await client.close();
   }
}

main().catch(console.error);


async function newcollection (client, dbname){
   const dbobj = await client.db(dbname);
   const collection = await dbobj.createCollection("MyCollection");
   console.log("Collection created");
   console.log(collection);
}

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