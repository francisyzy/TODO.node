const mongoose = require('mongoose')

const Dishes = require('./models/dishes')

const url = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url)

connect.then((db) => {
  console.log('Conencted to server')

  var newDish = Dishes({
    name: 'Dishasdnaasdsdame',
    description: 'NASD'
  })

  newDish.save()
    .then((dish) => {
      console.log(dish)

      return Dishes.find({}).exec()
    })
    .then((dishes) => {
      console.log(dishes)

      // return db.collection('dishes').drop();
      return Dishes.remove() // https://stackoverflow.com/a/43943584
    })
    .then(() => {
      console.log('dropped collection')
      // return db.close();
      return db.disconnect()
    })
    .catch((err) => console.log(err))
})
