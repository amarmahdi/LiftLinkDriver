const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { geocode } = require("./geocode/index");
const { directions } = require("./directions/index");
const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

exports.geocode = onRequest((request, response) => {
  geocode(request, response, client);
});

exports.directions = onRequest((request, response) => {
  directions(request, response, client);
});
