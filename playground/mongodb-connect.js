// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017',(err, client)=>{
    if(err){
        console.log('unable to connect MongoDB server')
    }else{
        console.log('Connected to Mongo db server')
    }

    let db = client.db('TodoApp')  

    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    },(err, result)=>{
        console.log(result.ops[0]._id.getTimestamp())
        client.close()
    })

    
})