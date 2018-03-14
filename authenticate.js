const passport = require('passport')
const LocalStragety = require('passport-local').Strategy
const JwtStragety = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')

const User = require('./models/user')
const config = require('./config')

exports.local = passport.use(new LocalStragety(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey, {expiresIn: 36000})
}

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.secretKey

exports.jwtPassport = passport.use(new JwtStragety(opts, (jwtPayload, done) => {
  console.log('JWT Payload: ', jwtPayload)
  User.findOne({_id: jwtPayload._id}, (err, user) => {
    if (err) {
      return done(err, false)
    } else if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
}))

exports.verifyUser = passport.authenticate('jwt', {session: false})
