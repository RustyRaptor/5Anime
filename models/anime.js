var mongoose = require('mongoose');

var Anime = mongoose.model('Anime', {
	id: {
		type: Number,
		required: true,
	},
	idMal: {
		type: Number,
	}
	title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
	},
	genres: {
		type: Array,
	},
	episodes: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
		minlength: 1,
	},
});

module.exports = {Todo};
