const MongoClient = require('mongodb').MongoClient

const dboperation = require('./operations')
const url = 'mongodb://localhost:27017/conFusion'

MongoClient.connect(url).then((db) => {
  console.log('connected successfully')
  dboperation.insertDocument(db, {name: 'Test', description: 'asdasd'}, 'dishes')
    .then((result) => {
      console.log('Insert document \n', result.ops)
      dboperation.findDocument(db, 'dishes')
    })
    .then((docs) => {
      console.log('Found Documents \n', docs)
      return dboperation.updateDocument(db, {name: 'Test'}, {description: '123'}, 'dishes')
    })
    .then((result) => {
      console.log('Updated document \n', result.result)
      return dboperation.findDocument(db, 'dishes')
    })
    .then((docs) => {
      console.log('Found Updated Documents \n', docs)

      const confusion = db.db('conFusion')
      return confusion.dropCollection('dishes')
    })
    .then((result) => {
      console.log('dropped collection')
      return db.close()
    })
    .catch((err) => console.log(err))
}, (err) => console.log(err))
  .catch((err) => console.log(err))
