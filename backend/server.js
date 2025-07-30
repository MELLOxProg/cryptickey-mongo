const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors')

dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Nomenclature & App Initialization
const dbName = 'crypticKey';
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())

client.connect();

//Get all the passwords
app.get('/', async(req, res) => {
    const db = client.db(dbName)
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    res.json(findResult)
})

//Save the passwords
app.post('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    console.log('Found documents =>', findResult);
    res.send({success: true, result: findResult})
})

//Delete a password by id
app.delete('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    console.log('Found documents =>', findResult);
    res.send({success: true, result: findResult})
})

app.listen(port, () => {
    console.log(`Server app listening on port http://localhost:${port}`)
})