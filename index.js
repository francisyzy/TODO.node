const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017/conFusion'

MongoClient.connect(url, (err,db) => {
    assert.equal(err,null)
    console.log('connected successfully')

    const confusion = db.db("conFusion")

    const collection = confusion.collection('dishes')

    collection.insertOne({
        "name":"Pizza2",
        "description":"test12"
    },
    (err,result) => {

        assert.equal(err,null)

        console.log("after insert:\n")
        console.log(result.ops)

        collection.find({}).toArray((err,docs)=>{
            assert.equal(err,null)

            console.log("Found:\n")
            console.log(docs)

            confusion.dropCollection("dishes", (err,result) => {
                assert.equal(err,null)

                db.close()
            })
        })
    })
})