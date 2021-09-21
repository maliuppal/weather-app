const axios = require('axios');

const geocode = async (address, callback) =>
    
// console.log(`address: ${address}`);
    axios
        .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?`, {
            params: {
                access_token: 'pk.eyJ1IjoiYWxpdXBwYWwiLCJhIjoiY2t0YjZ2ODFzMTBicDJ1cDk5cnFwZWplaSJ9.IkVq8RVxn0ftLW35HmdLAg',
            },
        })
        .then((res) => {

            let response = null;
            if (res && res.data && res.data.features[0]) {
                const latitude = res.data.features[0].center[1];
                const longitude = res.data.features[0].center[0];
                response = { latitude, longitude }
            } else {
                response = {error: 'unable to find the location'}
            }

            callback(response);
        })
        .catch((error) => {
            console.log(`Error in geocode: ${error}, ${error.stack}`);
        });

module.exports = geocode;
