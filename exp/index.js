const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser');
var cors = require('cors')
app.use(cors())

app.use(bodyParser.json({ type: 'application/*+json' }));


//MongoDB
//ar mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var projectObj = [
    { name: 'Shoe', price: '100'},
    { name: 'TV', price: '200'},
    { name: 'Shirt', price: '300'},
    { name: 'Tees', price: '400'},
    { name: 'Toys', price: '500'},
    { name: 'Dress', price: '600'},
    { name: 'Mobile', price: '700'},
    { name: 'Laptop', price: '800'},
    { name: 'Jewel', price: '900'},
    { name: 'Playstation', price: '1000'},
    { name: 'Speakers', price: '1100'}
  ];

  dbo.collection("products").insertMany(projectObj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
  
});

app.get('/', (req, res) =>{
    var response ;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("products").find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          res.send(result)
          db.close();
        });
      });
    
      
}) 

app.listen(port, () => console.log(`Example app listening on port ${port}!`))