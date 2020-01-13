let express = require('express');
const app = express();
var cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
const assert = require('assert');
require('dotenv').config()

app.use(express.json());
app.use(cors());

// Connection URL
const url = process.env.ATLAS_CONNECTION

// Database Name
const dbName = 'Todo';
const settings = {
    useUnifiedTopology: true
}
const createTodo = (contact) => {
    // Use connect method to connect to the server
    let iou = new Promise ((resolve, reject) =>{
        MongoClient.connect(url, settings, function (err, client) {
            if(err){
                reject(err)
            }
            else { 
                console.log("Connected to server for Creation of Contact");
                const db = client.db(dbName);
                // Get the contacts collection
                const collection = db.collection('Todo Items');
                // Insert a document
                collection.insertOne(contact, function (err, result) {
                    if(err){
                        reject(err)
                    }
                    else{
                        client.close();
                        resolve("Inserted a Todo into the Todo List");
                    }
                });
            } 
        })
    });
    return iou
}
const readContacts = () => {
    let iou = new Promise((resolve, reject) => {
    // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if(err){
            reject(err)
            }else{
                console.log("Connected to server Read Contacts");
                const db = client.db(dbName);
                const collection = db.collection('Todo Items');
                // Find some documents
                
                collection.find({}).toArray(function (err, docs) {
                    if(err){
                        reject(err)
                    }else{
                        const results = docs;
                        client.close();
                        resolve(results);
                    }
                });
            }
        });
    })
    return iou;
}
const updateTodo = (id, contact) => {
    let iou = new Promise((resolve, reject) => {
        
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            }
            else{
                console.log("Connected to server to Update a Contact");
                const db = client.db(dbName);
                // Get the contacts collection
                const collection = db.collection('Todo Items');
                collection.updateOne({ '_id': ObjectId(id) }, 
                    { $set: {
                        title: contact
                     } },
                    function (err, result) {
                        if(err){
                            reject(err)
                        }  else{
                            client.close();
                            resolve("Updated a Todo in the Todo List");
                        }
                });
            }
        });
    })
    return iou
}
const deleteTodo = (id) => {
    let iou = new Promise ((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if(err){
               reject(err) 
            } else {
                console.log("Connected to server to Delete a Contact");
                const db = client.db(dbName);
                // Get the contacts collection
                const collection = db.collection('Todo Items');
                // Insert a document
                collection.deleteOne({ '_id': ObjectId(id) },
                    function (err, result) {
                        if(err){
                            reject(err)
                        } else {
                            client.close();
                            resolve("Delete a Todo")
                        }
                    });
            }          
       }); 
    })
    return iou
};
app.get('/todo', async(req, res) => {
    let darn = await readContacts();
    res.send(darn);
})
app.post('/todo', async(req, res) => {
    let newTodo = {
        title: req.body.title
    }
    await createTodo(newTodo);
    res.send(newTodo);
})
app.put('/todo', async(req, res) => {
    let id = req.body._id;
    let newName = req.body.title;
    await updateTodo(id, newName);
    res.send(newName);
})
app.delete('/todo', async(req, res) => {
    let deleteATodo = req.body._id;
    await deleteTodo(deleteATodo);
    res.send(deleteATodo);
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log (`server started on port ${PORT}`))