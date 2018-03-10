const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const index = require('./routes/index')
const users = require('./routes/users')
const lists = require('./routes/listsRoutes')

const app = express()

// Connection url
const url = 'mongodb://localhost:27017/todo'
const connect = mongoose.connect(url)

connect.then((db) => {
  console.log('Connected to server')
}, (err) => {
  console.log(err)
})

// Auth setup
function auth (req, res, next) {
  console.log(req.header)
  let authHeader = req.headers.authorization
  if (!authHeader) {
    let err = new Error('You are not authenticated')
    res.setHeader('WWW-Authenticate', 'Basic')
    next(err)
  }
  let auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
  let user = auth[0]
  let pass = auth[1]
  if (user === 'admin' && pass === 'password') {
    next()
  } else {
    let err = new Error('You are not authenticated')
    res.setHeader('WWW-Authenticate', 'Basic')
    err.status = 401
    next(err)
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(auth)
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)
app.use('/lists', lists)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
