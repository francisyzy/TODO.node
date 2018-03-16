const express = require('express')
const bodyParser = require('body-parser')
const authenticate = require('../authenticate')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Image files only!'))
  } else {
    cb(null, true)
  }
}

const upload = multer({storage: storage, fileFilter: imageFileFilter})

const uploadRouter = express.Router()

uploadRouter.use(bodyParser.json())

uploadRouter.route('/')
  .get((req, res, next) => {
    res.statusCode = 403
    res.end('GET operation not supported here')
  })
  .post(authenticate.verifyUser, upload.single('imageFile'), (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(req.file)
  })
  .put((req, res, next) => {
    res.statusCode = 403
    res.end('PUT operation not supported here')
  })
  .delete((req, res, next) => {
    res.statusCode = 403
    res.end('DELETE operation not supported here')
  })

module.exports = uploadRouter
