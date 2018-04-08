const express = require('express')
const bodyParser = require('body-parser')

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
        res.send(e)
    })
})

app.get('/todos/:id', (req, res)=>{

})


app.listen(3000,()=>{
    console.log('Started server on port 3000')
})


module.exports = {app}