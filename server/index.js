var express = require("express");
var app     = express();
var path    = require("path");
var DiscoverHttp = require('./discoverHttp')
var cors = require('cors')

app.use(cors())

app.get('/getExchangeRate', function(req, res, next) {
  // Handle the get for this route
  var discoverHttp = new DiscoverHttp();
  console.log(discoverHttp)
  var _self = this;
  const data = discoverHttp.getExchangeRate().then(x => {
    console.log(x)
    res.send(JSON.stringify(x));

  })

  //discoverHttp.getExchangeRate().then(res => console.log(res));
});


app.listen(4200);

console.log("Running at Port 4200");
