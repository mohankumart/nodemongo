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
            .set('x-auth','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWNlZGY1MzkwODYyMjJkMzA2MzU4NmIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTIzNTA3MDI3fQ.p-qLAVusFPbietley0HOmxahF3-GK7JzYf05i15mfKg')
            .expect(200)
            .expect((res)=>{
                expect(res.body.email).toBe('hello@test.com')
            })
            .end(done)
    })  
    
    it('should return if not authenticated', (done)=>{
        done()
    })
})

describe('POST /users',() => {
    it('should create a user', (done)=>{
        var email = 'hewelawlo@test.com'
        var password = '12as3mnb'

        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res)=>{
                console.log(res.body.email)
            })
            .end(done)
    })
})