const configENV = require('dotenv').config()
config = configENV.parsed;
console.log("config", config)
const fetch = require('node-fetch');
var querystring = require('querystring');

module.exports = class googlePlaceHttp {
  constructor() {
    this.domian = 'https://maps.googleapis.com/'
    this.ENDPOINT = {
      PLACE_SEARCH: 'maps/api/place/textsearch/json',
      PHOTO_SEARCH: 'maps/api/place/photo'
    }


   }


  getPlaceDetail(query, location){
    const GOOGLE_API_KEY = config.GOOGLE_API_KEY

    var postData = querystring.stringify({
      query: query,
      location: location,
      radius:10000,
      key: GOOGLE_API_KEY
    });
    return this.getData(this.domian+this.ENDPOINT.PLACE_SEARCH+"?"+postData, {});
  }

getPlaceImage(photoreference){
  const GOOGLE_API_KEY = config.GOOGLE_API_KEY

  var postData = querystring.stringify({
    maxwidth: 400,
    photoreference:photoreference,
    key: GOOGLE_API_KEY
  });
  return this.getData(this.domian+this.ENDPOINT.PHOTO_SEARCH+"?"+postData, {}, false);
}
  postData(url, data, extendHeader){
    const allHeader = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            ...extendHeader
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data, // body data type must match "Content-Type" header
    };
    // console.log("allHeader", allHeader)

    return fetch(url, allHeader)
    .then(response => {console.log(response); return response.json();});
  }
  getData(url, extendHeader, isJson = true){
    console.log(url)
    const allHeader = {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
            ...extendHeader
            // "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    console.log("allHeader", allHeader)

    return fetch(url, allHeader)
    .then(response => {
      if(isJson){
        return response.json()
      }else{
        return response.buffer();
      }

    });
  }




}
