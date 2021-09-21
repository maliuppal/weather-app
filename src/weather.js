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
            console.log(JSON.stringify(res.data))
            callback(res.data);
        })
        .catch((error) => {
            console.log(`Error in getWeather: ${error}`);
        });
};

module.exports = getWeather;
