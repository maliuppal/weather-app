const path = require('path');
const express = require('express');
require('./custom/exceptions');
const hbs = require('hbs');

const getGeocode = require('./geocode');
const getWeather = require('./weather');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirecytoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// setup static dircetory to serve
app.use(express.static(path.join(publicDirecytoryPath)));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ali Uppal',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ali Uppal',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ali Uppal',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'address is required.' });
    }
    try {
        getGeocode(req.query.address, (geoData) => {
            if (geoData.error) {
                res.send({ error: 'unable to find the location' });
            }
            getWeather(geoData.latitude, geoData.longitude, (weatherData) => {
                res.send(weatherData);
            });
        });
    } catch (error) {
        res.send(error);
    }
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Weather App',
        name: 'Ali Uppal',
    });
});

app.listen(port, () => {
    console.log(`server is up on port: ${port}`);
});
