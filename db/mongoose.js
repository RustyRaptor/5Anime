var mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/tests', {
	useMongoClient: true,
})

module.exports = { mongoose }
