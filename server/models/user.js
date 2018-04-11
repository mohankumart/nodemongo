const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

var UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator : (value) => {
                return validator.isEmail
            },
            message: 'value is not valid'        
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            required: true,
            type: String
        },
        token: {
            required: true,
            type: String
        }
    }]
})

UserSchema.pre('save', function(next){
    debugger
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(user.password, salt, (err, hash)=>{
                user.password = hash
                next()
            })
        })
    }else{
        next()
    }
})
    

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject()

    return _.pick(userObject, ['email','password'])
}


UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(), access}, 'abc123').toString()
    user.tokens.push({access:access, token:token})
    return user.save().then(()=>{
        return token;
    },(err)=>{
        console.log('cannot save token')
    })
}

UserSchema.statics.findByToken = function(token){
    var decoded; 
    try{
        decoded = jwt.verify(token, 'abc123')
    }catch(e){
        // return new Promise((resolve, reject)=>{
        //     reject()
        // })
        return Promise.reject('auth failed')
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'    
    })
}

var User = mongoose.model('User', UserSchema)

module.exports = {User}