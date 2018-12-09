var express = require("express");
var app     = express();
var path    = require("path");
var DiscoverHttp = require('./discoverHttp')
var cors = require('cors')

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(cors())
app.options('*', cors());
app.get('/', function(req, res, next) {
  // Handle the get for this route
  res.send(JSON.stringify('alive'));
});
app.get('/getBearToken', function(req, res, next) {
  // Handle the get for this route
  var discoverHttp = new DiscoverHttp();
  return discoverHttp.getBearToken().then(x => {
    console.log(x)
    res.send(JSON.stringify(x.access_token));

  })

  //discoverHttp.getExchangeRate().then(res => console.log(res));
});


app.get('/exchangerate', function(req, res, next) {
  // Handle the get for this route
  var discoverHttp = new DiscoverHttp();
  return discoverHttp.getExchangeRate(req.query.currencycd).then(x => {
    console.log(x)
    res.send(JSON.stringify(x));

  })

  //discoverHttp.getExchangeRate().then(res => console.log(res));
});


app.get('/cityguide', function(req, res, next) {
  var discoverHttp = new DiscoverHttp();
  return discoverHttp.getCityGuide(req.query.merchant_city).then(x => {
    console.log(x, req.query.merchant_city);
    res.send(JSON.stringify(x));
  })
})


app.listen(process.env.PORT || 4200);

console.log("Running at Port 4200");
