const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

Todo.remove({}).then((res)=>{
    console.log(res)
},(err)=>{

})

Todo.findOneAndRemove('123').then((res)=>{
    console.log(res)
},(err)=>{
    console.log(err)
})








