const express = require('express')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')

const Lists = require('../models/lists')

const listRouter = express.Router()

listRouter.use(bodyParser.json())

listRouter.route('/')
  .get((req, res, next) => {
    Lists.find({})
      .then((lists) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(lists)
      }, (err) => next(err))
      .catch((err) => next(err))
  })
  .post((req, res, next) => {
    Lists.create(req.body)
      .then((list) => {
        console.log('List Created' + list)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(list)
      }, (err) => next(err))
      .catch((err) => next(err))
  })
  .put((req, res, next) => {
    res.statusCode = 403
    res.end('Put operation not supported!')
  })
  .delete((req, res, next) => {
    Lists.remove({})
      .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
      }, (err) => next(err))
      .catch((err) => next(err))
  })

listRouter.route('/:listId')
  .get((req, res, next) => {
    Lists.findById(req.params.listId)
      .then((list) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(list)
      }, (err) => next(err))
      .catch((err) => next(err))
  })
  .post((req, res, next) => {
    res.statusCode = 403
    res.end('Post operation not supported on /lists' + req.params.listId)
  })
  .put((req, res, next) => {
    Lists.findByIdAndUpdate(req.params.listId, {
      $set: req.body
    }, {new: true})
      .then((task) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(task)
      }, (err) => next(err))
      .catch((err) => next(err))
  })
  .delete((req, res, next) => {
    Lists.findByIdAndRemove(req.params.listId)
      .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
      }, (err) => next(err))
      .catch((err) => next(err))
  })

module.exports = listRouter
