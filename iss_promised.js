const request = require('request-promise-native');

const fetchMyIP = function() {
  return request("https://api.ipify.org?format=json")  
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`)
};

const fetchISSFlyOverTimes = function(body) {
  const data1 = JSON.parse(body)
  const coords = {
    latitude: data1.latitude,
    longitude: data1.longitude,
  };
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`
  return request(url)
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = {nextISSTimesForMyLocation}