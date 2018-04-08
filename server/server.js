const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/todos',(req, res)=>{
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc)=>{
        res.send(doc)
    },(e)=>{
        res.status(400).send(e)
    })
})

app.get('/todos', (req, res) => {
    Todo.find({}).then((todos)=>{
        res.send({todos})
    },(err)=>{
        res.status(400).send(err)
    })
})

app.get('/todos/:id', (req, res)=>{
    var id = req.params.id

    if(!ObjectID.isValid(id)){
        return res.status(404).send('not valid object id')
    }

    Todo.findById(id).then((todo)=>{
        if(!todo){
            res.status(404).send('doc not found')
        }else{
            res.send({todo})
        }
    },(err)=>{
        res.status(400).send(err)
    })
})


app.listen(3000,()=>{
    console.log('Started server on port 3000')
})


module.exports = {app}