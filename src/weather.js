const axios = require('axios');

const getWeather = async (latitude, longitude, callback) => {
    axios
        .get('http://api.weatherstack.com/current', {
            params: {
                access_key: '07d0d6555437a8984bc1d30df7e1f40d',
                query: `${latitude},${longitude}`,
            },
        })
        .then((res) => {
            callback(res.data);
        })
        .catch((error) => {
            callback({error: 'unable to find the location'});
            console.log(`Error in getWeather: ${error}`);
        });
};

module.exports = getWeather;
