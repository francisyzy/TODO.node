const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const authenticate = require('./authenticate')
const config = require('./config')

const index = require('./routes/index')
const users = require('./routes/users')
const lists = require('./routes/lists')
const uploads = require('./routes/uploads')

const app = express()

// Redirect to secure server
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next()
  } else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url)
  }
})

// Connection url
const url = config.mongoUrl
const connect = mongoose.connect(url)

connect.then((db) => {
  console.log('Connected to server')
}, (err) => {
  console.log(err)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('seceret-key'))
app.use(passport.initialize())
app.use('/', index)
app.use('/users', users)
app.use('/upload', uploads)
app.use(express.static(path.join(__dirname, 'public')))

app.use(authenticate.verifyUser)
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
