var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true })
mongoose.Promise = global.Promise

module.exports = { mongoose }
