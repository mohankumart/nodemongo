const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

var app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',(req, res)=>{
    res.send('hello world!!!')
})

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

app.delete('/todos/:id', (req, res)=>{
    var id = req.params.id

    if(!ObjectID.isValid(id)){
        return res.status(404).send('not valid object id')
    }

    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            res.status(404).send('doc not found')
        }else{
            res.send({todo})
        }
    },(err)=>{
        res.status(400).send(err)
    })

})

app.listen(port,()=>{
    console.log(`Started server on port ${port}`)
})


module.exports = {app}