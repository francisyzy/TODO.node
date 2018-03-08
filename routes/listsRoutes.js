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

listRouter.route('/:listId/tasks')
  .get((req, res, next) => {
    Lists.findById(req.params.listId)
      .then((list) => {
        if (list != null) {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.json(list.task)
        } else {
          var err = new Error('List ' + req.params.listId + ' not found')
          err.statusCode = 404
          return next(err)
        }
      }, (err) => next(err))
      .catch((err) => next(err))
  })
  .post((req, res, next) => {
    Lists.findById(req.params.listId)
      .then((list) => {
        if (list != null) {
          list.tasks.push(req.body)
          list.save()
            .then((list) => {
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.json(list)
            })
        } else {
          var err = new Error('List ' + req.params.listId + ' not found')
          err.statusCode = 404
          return next(err)
        }
      }, (err) => next(err))
      .catch((err) => next(err))
  })
  .put((req, res, next) => {
    res.statusCode = 403
    res.end('Put operation not supported on /lists/' + req.params.listId)
  })
  .delete((req, res, next) => {
    Lists.findById(req.params.listId)
      .then((list) => {
        if (list != null) {
          for (var i = 0; i <= (list.task.length - 1); i++) {
            list.task.id(list.task[i]._id).remove()
          }
          list.save()
            .then((list) => {
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.json(list.task)
            })
        } else {
          var err = new Error('List ' + req.params.listId + ' not found')
          err.statusCode = 404
          return next(err)
        }
      }, (err) => next(err))
      .catch((err) => next(err))
  })

listRouter.route('/:listId/tasks/:taskId')
  .get((req, res, next) => {
    Lists.findById(req.params.listId)
      .then((list) => {
        if (list != null && list.task.id(req.params.taskId) != null) {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.json(list.task.taskId)
        } else {
          var err = new Error('List ' + req.params.listId + ' not found')
          err.statusCode = 404
          return next(err)
        }
      }, (err) => next(err))
      .catch((err) => next(err))
  })
  .post((req, res, next) => {
    res.statusCode = 403
    res.end('Post operation not supported on /lists/' + req.params.listId)
  })
  .put((req, res, next) => {
    Lists.findById(req.params.listId)
      .then((list) => {
        if (list != null && list.task.id(req.params.taskId) != null) {
          if (req.body.taskName) {
            list.task.id(req.params.taskId).taskName = req.body.taskName
          }
          if (req.body.description) {
            list.task.id(req.params.taskId).description = req.body.description
          }
          if (req.body.deadline) {
            list.task.id(req.params.taskId).deadline = req.body.deadline
          }
          if (req.body.category) {
            list.task.id(req.params.taskId).category = req.body.category
          }
          list.save()
            .then((list) => {
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.json(list.task.taskId)
            })
        } else {
          var err = new Error('List ' + req.params.listId + ' not found')
          err.statusCode = 404
          return next(err)
        }
      }, (err) => next(err))
      .catch((err) => next(err))
  })
  .delete((req, res, next) => {
    Lists.findById(req.params.listId)
      .then((list) => {
        if (list != null && list.task.id(req.params.taskId) != null) {
          list.task.id(list.task.taskId).remove()
          list.save()
            .then((list) => {
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.json(list.task)
            })
        } else if (list == null) {
          var err = new Error('List ' + req.params.listId + ' not found')
          err.statusCode = 404
          return next(err)
        } else {
          err = new Error('Task ' + req.params.listId + ' not found')
          err.statusCode = 404
          return next(err)
        }
      }, (err) => next(err))
      .catch((err) => next(err))
  })

module.exports = listRouter
