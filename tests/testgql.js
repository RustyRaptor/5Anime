const fetch = require('isomorphic-fetch');
const express = require("express");
const hbs = require("hbs");
const parseString = require('xml2js').parseString;
const fs = require('fs');
const {
        MongoClient,
        ObjectID
} = require('mongodb');
const assert = require('assert');

var obj = new ObjectID();
console.log(obj);

var query = `
query ($id: Int) {
  Media (id: $id, type: ANIME) {
    id
    title {
      romaji
      english
      native
    }
  }
}
`;

var variables = {
        id: 15125
};

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
        };

fetch(url, options).then(handleResponse)
        .then(handleData)
        .catch(handleError);

function handleResponse(response) {
        return response.json().then(function(json) {
                return response.ok ? json : Promise.reject(json);
        });
}

function handleData(data) {
        console.log(JSON.stringify(data));
        MongoClient.connect('mongodb://localhost:27017/5Anime', (err, db) => {
                if (err) {
                        return console.log('unable to connect to mongodb server');
                }
                console.log('connected to mongodb server');

                db.collection('test').insertOne(data).then((result) => {
                        console.log(result);
                })
        })

}

function handleError(error) {
        alert('Error, check console');
        console.error(error);
}