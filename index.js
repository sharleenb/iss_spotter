const { nextISSTimesForMyLocation } = require('./iss');

const printResults = function(results) {
  for (const result of results) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(result.risetime);
    const duration = result.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, results) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printResults(results);
});



// temporary test code
// const {fetchMyIP} = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
// });

//____

// const { fetchCoordsByIP} = require("./iss")
// fetchCoordsByIP("42", (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned coordinates:", coords);
// });


// const {fetchISSFlyOverTimes} = require("./iss");

// fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, results) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned results:", results);
// });