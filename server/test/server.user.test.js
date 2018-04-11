const request = require('supertest')
const expect = require('expect')
const {ObjectID} = require('mongodb')

const {app} = require('./../server')
const {users, populateUsers} = require('./seed/seed')

//beforeEach(populateUsers)

describe('GET /users/me',()=>{
    it('should return user if authenticated', (done)=>{
        console.log(users[0].tokens[0].token)
        request(app)
            .get('/users/me/')
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .expect((res)=>{
                expect(res.body.emai).toBe(users[0].email())
            })
            .end(done)
    })  
    
    it('should return if not authenticated', (done)=>{
        done()
    })
})

