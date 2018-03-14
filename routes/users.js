const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const authenticate = require('../authenticate')

const User = require('../models/user')

const userRouter = express.Router()

userRouter.use(bodyParser.json())

userRouter.route('/')
  .get((req, res, next) => {
    User.find({})
      .then((users) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(users)
      }, (err) => next(err))
      .catch((err) => next(err))
  })

userRouter.route('/signup')
  .post((req, res, next) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.json({err: err})
      } else {
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.json({success: true, status: 'Registration Successful!'})
        })
      }
    })
  })

userRouter.route('/login')
  .post(passport.authenticate('local'), (req, res) => {
    let token = authenticate.getToken({_id: req.user._id})
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({success: true, token: token, status: 'You are successfully logged in'})
  })

userRouter.route('/logout')
  .get((req, res, next) => {
    if (req.session) {
      req.session.destroy()
      res.clearCookie('session-id')
      res.redirect('/')
    } else {
      let err = new Error('You are not logged in')
      err.status = 403
      next(err)
    }
  })

module.exports = userRouter
