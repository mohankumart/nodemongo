// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017',(err, client)=>{
    if(err){
        console.log('unable to connect MongoDB server')
    }else{
        console.log('Connected to Mongo db server')
    }

    let db = client.db('TodoApp')  

    db.collection('Todos').find({'_id': new ObjectID('5ac9b3d6c4fa3a2ae90ea66a')}).toArray().then((docs)=>{
        console.log('Todos')
        console.log(JSON.stringify(docs,undefined, 2))
        client.close()
    },(err)=>{
        console.log('unable to fecth data')
    })

    
})