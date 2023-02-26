const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const ip = data.ip;
    callback(error, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    const data1 = JSON.parse(body);

    if (!data1.success) {
      const message = `Success status was ${data1.success}. Server message says: ${data1.message} when fetching for IP ${data1.ip}`;
      callback(Error(message), null);
      return;
    }

    const coords = {
      latitude: data1.latitude,
      longitude: data1.longitude,
    };
    callback(error, coords);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    const data2 = JSON.parse(body);

    if (response.statusCode !== 200) {
      const msg1 = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg1), null);
      return;
    }

    const results = data2.response;
    callback(error, results);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, results);
      });
    });
  });
};

module.exports = { fetchCoordsByIP, fetchMyIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};
