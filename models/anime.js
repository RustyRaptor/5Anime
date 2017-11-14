var mongoose = require('mongoose')

var Anime = mongoose.model('Anime', {
	id: {
		type: Number,
		required: true,
	},
	idMal: {
		type: Number,
	},
	title: {
		romaji: {
			type: String,
			required: true,
			minlength: 1,
			trim: true,
		},
		english: {
			type: String,
		},
		native: {
			type: String,
		},
	},
	// title: {
	// 	type: String,
	// 	required: true,
	// 	minlength: 1,
	// 	trim: true,
	// },
	// titleEnglish: {
	// 	type: String,
	// },
	// titleRomaji: {
	// 	type: String,
	// },
	// titleNative: {
	// 	type: String,
	// },
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
	type: {
		type: String,
	},
	format: {
		type: String,
	},
	status: {
		type: String,
		required: true,
	},
	season: {
		type: String,
	},
	duration: {
		type: Number,
	},
	chapters: {
		type: Number,
	},
	volumes: {
		type: Number,
	}
})

module.exports = {Anime}
