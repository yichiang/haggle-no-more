var express = require("express");
var app     = express();
var path    = require("path");
var DiscoverHttp = require('./discoverHttp')
var GooglePlaceHttp = require('./googlePlaceHttp')
var cors = require('cors')

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(cors())
app.options('*', cors());
app.get('/check', function(req, res, next) {
  // Handle the get for this route
  res.send(JSON.stringify('alive'));
});

app.use(express.static(__dirname + '/build'));


// app.get('/', express.static(`${process.cwd()}/../build/index.html`));
console.log(`${process.cwd()}/build/index.html`)



app.get('/googlePlace', function(req, res, next) {
  // Handle the get for this route
  var googlePlaceHttp = new GooglePlaceHttp();
  var resT = googlePlaceHttp.getPlaceDetail(req.query.query, req.query.location).then(x => {
    console.log(x)
    res.send(JSON.stringify(x));

  })


  //discoverHttp.getExchangeRate().then(res => console.log(res));
});

app.get('/googlePlaceImage', function(req, res, next) {
  // Handle the get for this route
  var googlePlaceHttp = new GooglePlaceHttp();
  googlePlaceHttp.getPlaceImage(req.query.photo_reference).then(x => {
    console.log("googlePlaceImage", x)
    res.send(x);

  })

  //discoverHttp.getExchangeRate().then(res => console.log(res));
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

app.get('/atmFinder', function(req, res, next) {
  // Handle the get for this route
  var discoverHttp = new DiscoverHttp();
  return discoverHttp.getAtmFinder(req.query.longitude, req.query.latitude,req.query.radius, req.query.maxresults).then(x => {
    console.log(x)
    res.send(JSON.stringify(x));

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
app.get('*', function(req, res){
  res.sendfile(__dirname + '/build/index.html');
});

app.listen(process.env.PORT || 4200);

console.log("Running at Port 4200");
