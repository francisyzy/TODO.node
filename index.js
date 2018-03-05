const mongoose = require('mongoose')

const Dishes = require('./models/dishes')

const url = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url, {
  useMongoClient: true
})

connect.then((db) => {
  console.log('Conencted to server')

  var newDish = Dishes({
    name: 'Dishasdname',
    description: 'NASD'
  })

  newDish.save()
    .then((dish) => {
      console.log(dish)

      return Dishes.find({}).exec()
    })
    .then((dishes) => {
      console.log(dishes)

      return db.collection('dishes').drop()
    })
    .then(() => {
      console.log('dropped collection')

      return db.close()
    })
    .catch((err) => console.log(err))
})
