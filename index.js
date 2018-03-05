const mongoose = require('mongoose')

const Dishes = require('./models/dishes')

const url = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url)

connect.then((db) => {
  console.log('Conencted to server')

  Dishes.create({
    name: 'Dishasdnaasdsdame',
    description: 'NASD'
  })
    .then((dish) => {
      console.log(dish)

      return Dishes.findByIdAndUpdate(dish._id, {
        $set: {description: 'updated test'}
      }, {
        new: true
      }).exec()
    })
    .then((dish) => {
      console.log(dish)

      dish.comments.push({
        rating: 5,
        comment: 'Very good fish',
        author: 'John Smith'
      })

      return dish.save()
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
