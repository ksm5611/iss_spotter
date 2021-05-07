const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

/*
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

/*
 * Requests data from api.open-notify.org using provided lat/long data
 * Input: JSON body containing geo data response from freegeoip.app
 * Returns: Promise of request for fly over data, returned as JSON string
 */
const fetchISSFlyOverTimes = function(body) {
  const times = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${times.latitude}&lon=${times.longitude}`;
  return request(url);
};

const printPassTimes = function(passTimes) {
  const times = JSON.parse(passTimes);
  for (const pass of times.response) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

/*
 * Input: None
 * Returns: Promise for fly over data for users location
 */
// const nextISSTimesForMyLocation = function() {
//   return fetchMyIP()
//     .then(fetchCoordsByIP)
//     .then(fetchISSFlyOverTimes)
//     .then(printPassTimes)
//     .then((data) => {
//       const { response } = JSON.parse(data);
//       return response;
//     });
// };


// module.exports = { nextISSTimesForMyLocation };
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, printPassTimes };

