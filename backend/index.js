require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const events = require('events');
const messageEventEmitter = new events.EventEmitter();

const {createUser , checkUser}  = require('./db/user')
const {createTodo , getAllTodos , getSingleTodo , updateTodo , deleteTodo}  = require('./db/todo')


const app = express()

const centralized_token = {
    // userid : token
}


mongoose.connect(process.env.MONGO_URL,{dbName: 'testdb' })
  .then(() => console.log('Connected!'))
  .catch(err => console.log(err));


app.use(cors())
app.use(express.json());



const JWTMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) {
        return res.status(401).send({err: 'Auth token not found'})
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err || !user.id) {
            return res.status(403).send({err: 'Auth Token failed'})
        } 
        else if (user.id && (!centralized_token[user.id] || centralized_token[user.id] !== token)) {
            return res.status(403).send({err: 'Auth failed , login again'})
        }
        else{
            req.user = user
            next()
        }
        
    })
}


app.get('/', async (req, res) => {
    res.send({ping: "success"})
})


app.get('/auth', JWTMiddleware, (req, res) => {
    res.send({auth: "success"})
});

app.post('/auth/registration', async (req, res) => {

    try{
        const userName = req.body.username 
        const password = req.body.password 
        if(userName && password){
            const userData = await createUser(userName, password);
            if (userData){
                res.send({...userData})
            } else{
                res.status(400).send({err: 'Registration failed'})
            }
        } else{
            res.status(400).send({err: 'username an password require'})
        }
        
    } catch(err){
        console.log(err)
        res.status(400).send({err: 'server error'})
    }
  
  
})



app.post('/auth/login', async (req, res) => {

    try{
        const userName = req.body.username 
        const password = req.body.password 
        if(userName && password){
            const userData = await checkUser(userName, password);
            if (userData && userData.id){
                if(centralized_token[userData.id]){
                    res.send({...userData, Jwttoken: centralized_token[userData.id]})
                } else{
                    const expire_time = Math.floor(Date.now() / 1000) + parseInt(process.env.JWT_EXPIRE_time || 3600) 
                    var Jwttoken = jwt.sign({ ...userData , exp: expire_time}, process.env.JWT_SECRET);
                    centralized_token[userData.id] = Jwttoken
                    res.send({...userData, Jwttoken})
                }
                
            } else{
                res.status(400).send({err: 'login failed'})
            }
            
        } else{
            res.status(400).send({err: 'username an password require'})
        }
        
    } catch(err){
        console.log(err)
        res.status(400).send({err: 'server error'})
    }
  
  
})


app.get('/auth/logout-from-all', JWTMiddleware,  async (req, res) => {
    try{
        const user_id = req.user.id
        if(centralized_token[user_id]){
            delete centralized_token[user_id]
        }
        res.send({logout : "success"})
    } catch(err){
        console.log(err)
        res.status(400).send({err: 'error in logout'})
    }

})






app.get('/todo', JWTMiddleware, async (req, res) => {
    try{
        const user_id = req.user.id
        const todoResult = await getAllTodos(user_id)
        res.send([...todoResult])

    } catch(err) {
        console.log(err)
        res.status(400).send({err: 'error in retriving todos'})
    }
})

app.get('/todo/:todo_id', JWTMiddleware, async (req, res) => {
    try{
        const user_id = req.user.id
        const todo_id = req.params.todo_id || ''
        const todoResult = await getSingleTodo(todo_id,user_id)
        res.send({...todoResult})

    } catch(err) {
        console.log(err)
        res.status(400).send({err: 'error in retriving todo'})
    }
})



app.post('/todo', JWTMiddleware, async (req, res) => {
    try{
        const user_id = req.user.id
        const todo = req.body.todo_text  || null
        if(todo){
            const todoResult = await createTodo(todo,user_id)
            res.send({...todoResult})
        }
        else{
            res.status(400).send({err: 'todo is mandetory'})
        }
    } catch(err) {
        console.log(err)
        res.status(400).send({err: 'todo not saved'})
    }
    
    
})


app.patch('/todo/:todo_id', JWTMiddleware, async (req, res) => {
    try{
        const user_id = req.user.id
        const todo_id = req.params.todo_id || ''
        const new_todo_text = req.body.todo_text  || null

        const updatedTodo= await updateTodo(todo_id, new_todo_text, user_id)
        res.send({...updatedTodo})

    } catch(err) {
        console.log(err)
        res.status(400).send({err: 'error in updating todo'})
    }
})

app.delete('/todo/:todo_id', JWTMiddleware, async (req, res) => {
    try{
        const user_id = req.user.id
        const todo_id = req.params.todo_id || ''
       
        const isDeleted= await deleteTodo(todo_id, user_id)
        if (isDeleted) {
            res.send({...isDeleted})
        } else{
            res.status(400).send({err: 'todo not deleted'})
        }
        

    } catch(err) {
        console.log(err)
        res.status(400).send({err: 'error in deleting todo'})
    }
})



const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})