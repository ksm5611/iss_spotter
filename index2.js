// index2.js
// const { nextISSTimesForMyLocation } = require("./iss_promised");
// const request = require('request');
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, printPassTimes } = require('./iss_promised');

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(printPassTimes)
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });


// see index.js for printPassTimes
// copy it from there, or better yet, moduralize and require it in both files

// Call
// nextISSTimesForMyLocation()
//   .then((passTimes) => {
//     printPassTimes(passTimes);
//   })
  