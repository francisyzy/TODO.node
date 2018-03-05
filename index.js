const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const dboperation = require('./operations')
const url = 'mongodb://localhost:27017/conFusion'

MongoClient.connect(url, (err, db) => {
  assert.equal(err, null)
  console.log('connected successfully')
  dboperation.insertDocument(db, {name: 'Test', description: 'asdasd'}, 'dishes', (result) => {
    console.log('Insert document \n', result.ops)

    dboperation.findDocument(db, 'dishes', (docs) => {
      console.log('Found Documents \n', docs)

      dboperation.updateDocument(db, {name: 'Test'}, {description: '123'}, 'dishes', (result) => {
        console.log('Updated document \n', result.result)

        dboperation.findDocument(db, 'dishes', (docs) => {
          console.log('Found Updated Documents \n', docs)

          const confusion = db.db('conFusion')
          confusion.dropCollection('dishes', (result) => {
            console.log('dropped collection')

            db.close()
          })
        })
      })
    })
  })
})
