const fetch = require('isomorphic-fetch')
const {
	MongoClient,
	ObjectID
} = require('mongodb')


// const mongoose = require('./db/mongoose')
// const bodyParser = require('body-parser')

// const {Anime} = require('./models/anime')

var obj = new ObjectID()
console.log(obj)

var query = `
query ($id: Int) {
        Media (id: $id, type: ANIME) {
                id
                        idMal
                title {
                        romaji
                        english
                        native
                }
                genres
                episodes
                description
                type
                format
                status
                season
                duration
                chapters
                volumes
        }
}
`

var variables = {
	id: 15125
}

var url = 'https://graphql.anilist.co',
	options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		body: JSON.stringify({
			query: query,
			variables: variables
		})
	}
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true })
mongoose.Promise = global.Promise

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


fetch(url, options).then(handleResponse)
	.then(handleData)
	.catch(handleError)

function handleResponse(response) {
	return response.json().then(function(json) {
		return response.ok ? json : Promise.reject(json)
	})
}

function handleData(data) {
	console.log(JSON.stringify(data.data.Media))
	var anime = new Anime({
		id: data.data.Media.id,
		idMal: data.data.Media.idMal,
		title: {
			romaji: data.data.Media.title.romaji,
			english: data.data.Media.title.english,
			native: data.data.Media.title.native,
                },
                genres: data.data.Media.genres,
		episodes: data.data.Media.episodes,
		description: data.data.Media.description,
		status: data.data.Media.status,
	})
	anime.save(function (e) {
		if (e) {
			console.log(e)
		} else {
			console.log('Aw shit it worked')
		}
	})
}

function handleError(error) {
	console.log('Oh no it failed')
	console.error(error)
}
