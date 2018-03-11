const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const index = require('./routes/index')
const users = require('./routes/users')
const lists = require('./routes/lists')

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
  console.log('auth triggered' + req.session)
  if (!req.session.user) {
    let err = new Error('You are not authenticated')
    res.setHeader('WWW-Authenticate', 'Basic')
    err.status = 403
    return next(err)
  } else {
    if (req.session.user === 'authenticated') {
      next()
    } else {
      let err = new Error('You are not authenticated')
      res.setHeader('WWW-Authenticate', 'Basic')
      err.status = 403
      return next(err)
    }
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('seceret-key'))
app.use(session({
  name: 'session-id',
  secret: 'Secret-key',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}))
app.use('/', index)
app.use('/users', users)
console.log('app.use users activated?')
app.use(auth)
app.use(express.static(path.join(__dirname, 'public')))

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
