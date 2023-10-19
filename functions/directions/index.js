const url = require("url");
const functions = require("firebase-functions");

module.exports.directions = async (request, response, client) => {
  const { origin, destination } = url.parse(request.url, true).query;
  console.log("origin: ", origin);
  console.log("destination: ", destination);
  await client
    .directions({
      params: {
        origin: origin,
        destination: destination,
        key: functions.config().google.key,
      },
      timeout: 1000,
    })
    .then((res) => {
      response.json(res.data);
    })
    .catch((err) => {
      response.send(err);
    });
};
