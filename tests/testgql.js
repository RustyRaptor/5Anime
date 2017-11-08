const fetch = require('isomorphic-fetch')

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

fetch(url, options).then(handleResponse)
	.then(handleData)
	.catch(handleError)

function handleResponse(response) {
	return response.json().then(function(json) {
		return response.ok ? json : Promise.reject(json)
	})
}

function handleData(data) {
	console.log(JSON.stringify(data))

}

function handleError(error) {
	console.log('Error, check console')
	console.error(error)
}
