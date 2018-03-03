const express = require('express')
const bodyParser = require('body-parser')

const taskRouter = express.Router()

taskRouter.use(bodyParser.json())

taskRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.statusCode = 200
    res.end('will send task all to you!')
})
.post((req,res,next) => {
    res.statusCode = 200
    res.end('will add task: ' + req.body.name + 'with details: ' + req.body.description)
})
.put((req,res,next) => {
    res.statusCode = 200
    res.end('Put operation not supported!')
})
.delete((req,res,next) => {
    res.statusCode = 200
    res.end('Deleting all tasks')
})

module.exports = taskRouter