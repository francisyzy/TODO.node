const passport = require('passport')
const LocalStragety = require('passport-local').Strategy

const User = require('./models/user')

exports.local = passport.use(new LocalStragety(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
