const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = 'd3196f2a64e9eb39bf772c3b92313d1a';


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index');
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Never heard of that place. Try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Never heard of that place. Try again'});
      } else {
          
          if(weather.main.temp < 0){
        let weatherText = `At ${weather.main.temp} celcius, it's colder than Tilda Swinton in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
          } else if (weather.main.temp < 10) {
        let weatherText = `At ${weather.main.temp} celcius, it's marginally warmer than Tilda Swinton in ${weather.name}.`;
        res.render('index', {weather: weatherText, error: null});              
          } else if (weather.main.temp < 20) {
        let weatherText = `It's ${weather.main.temp} celcius in ${weather.name}. Far warmer than Tilda Swinton.`;
        res.render('index', {weather: weatherText, error: null});              
          } else {
        let weatherText = `It's like a thousand times warmer than Tilda Swinton in ${weather.name}. ${weather.main.temp} celcius.`;
        res.render('index', {weather: weatherText, error: null});              
          }
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})