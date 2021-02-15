const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};
/*
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const IP = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${IP}`);
};

const fetchISSFlyOverTimes = function(body) {
  const geo = JSON.parse(body);
  const lat = geo.latitude;
  const lon = geo.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const data = JSON.parse(body);
      return data.response;
    });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };