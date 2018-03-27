// const express = require('express')
const cors = require('cors')
// const app = express()

const whitelist = ['http://localhost:300', 'https://localhost:3443']
const corsOptionsDelicate = (req, callback) => {
  var corsOptions
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {origin: true}
  } else {
    corsOptions = {origin: false}
  }

  callback(null, corsOptions)
}

exports.cors = cors()
exports.corsWithOptions = cors(corsOptionsDelicate)