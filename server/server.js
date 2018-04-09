var env = process.env.NODE_ENV || 'development'
console.log(env)

if(env == 'development'){
    process.env.PORT = 3000
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
}else if(env == 'test'){
    process.env.PORT = 3000
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
}

const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')
const _ = require('lodash')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

var app = express()

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

app.patch('/todos/:id',(req, res) => {
    var id = req.params.id
    var body = _.pick(req.body, ['text','completed'])

    if(!ObjectID.isValid(id)){
        return res.status(404).send('not valid object id')
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime()
    }else{
        body.completed = false
        body.completedAt = null
    }

    Todo.findByIdAndUpdate(id,{$set:body},{$new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send()
        }
        res.send({todo})
    }).catch((e)=>{
        res.send(400).send(err)
    })

})
console.log(process.env.PORT)
app.listen(process.env.PORT,()=>{
    console.log(`Started server on port ${process.env.PORT}`)
})


module.exports = {app}




