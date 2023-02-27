const {nextISSTimesForMyLocation} = require('./iss_promised');

const printResults = function(results) {
  for (const result of results) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(result.risetime);
    const duration = result.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((results) => {
    printResults(results);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  })

