const functions = require("firebase-functions");
const url = require("url");

module.exports.geocode = async (request, response, client) => {
  const { address } = url.parse(request.url, true).query;
  await client.geocode({
    params: {
      address: address,
      key: functions.config().google.key
    },
    timeout: 1000
  }).then(res => {
    response.json(res.data);
  }).catch(err => {
    response.send(err);
  });
};
