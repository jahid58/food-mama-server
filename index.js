const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors') 
const app =express()
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const port =process.env.PORT || 5000 || 5000;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
require('dotenv').config()
console.log(process.env.DB_USER,process.env.DB_PASS,process.env.DB_NAME)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ntakd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const foodCollection = client.db(process.env.DB_NAME).collection("foods");
  const orderedCollection = client.db(process.env.DB_NAME).collection('orders');

  app.post('/addFood',(req,res)=>{
    const food = req.body;
    foodCollection.insertOne(food)
    .then(result=>res.send(result.insertedCount > 0))
})
app.get('/getFoods',(req,res)=>{
    foodCollection.find({})
  .toArray((err,documents)=>{
    res.send(documents)
  })
})
app.get('/checkedItem/:id',(req,res)=>{
    const id = ObjectID(req.params.id);
    foodCollection.find({_id:id})
    .toArray((err,documents)=>{
        res.send(documents[0])
    })
})
app.post('/orderedInfo',(req,res)=>{
    const ordered = req.body;
    orderedCollection.insertOne(ordered)
    .then(result=>{
       res.send(result.insertedCount > 0)
    })
})
app.get('/orders',(req,res)=>{
    const queryEmail = req.query.email;
    orderedCollection.find({email:queryEmail})
            .toArray((err,documents)=>{
               res.send(documents)
            })
})
app.get('/',(req,res)=>{
  res.send('working')
})
});

app.listen(port)
