const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

var id = '5aca67382540b74a5e49d799'

if(!ObjectID.isValid(id)){
    console.log('ID is not valid')
}else{
    console.log('ID is valid')
}

Todo.find({
    _id: id
}).then((todos)=>{
    console.log('Todos', todos)
})

Todo.findOne({
    _id: id
}).then((todo)=>{
    console.log(todo)
})

Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log('id not found')
    }
    console.log('single todo', todo)
}).catch((e)=>{
    console.log(e)
})

User.findById('5aca67382540b74a5e49d799').then((user)=>{
    if(!user){
        return console.log('Unable to find user')
    }
    console.log(user)
}).catch((err)=>{
    console.log(err)
})