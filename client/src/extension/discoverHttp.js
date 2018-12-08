import $ from 'jquery'
var config = require('dotenv').config()

export default class DiscoverHttp {
  domian = 'http://localhost:4200/'
  tokenURL = 'https://apis.discover.com/auth/oauth/v2/token'
  // ENDPOINT = {
  //   EXCHANGE_RATE: 'dci/currencyconversion/v1/exchangerate'
  // }

  ENDPOINT = {
    EXCHANGE_RATE: 'exchangerate'
  }

  HEADER_PLAN = {
    'EXCHANGE_RATE': 'DCI_CURRENCYCONVERSION_SANDBOX'

  }


  authToken = '6400cade-2f79-48a6-a91b-d45e3c3cf1e7'
  scope = 'CITYGUIDES DCIOFFERS DCIOFFERS_POST DCILOUNGES DCILOUNGES_POST DCILOUNGES_PROVIDER_LG DCILOUNGES_PROVIDER_DCIPL DCI_ATM DCI_CURRENCYCONVERSION DCI_CUSTOMERSERVICE DCI_TIP'
  getBearToken(){
    const tokenAPIKey = config.DISCOVER_APP_API_KEY
    const tokenAPISecret =config.DISCOVER_APP_API_SECRET
    const headers = {"Content-Type": 'application/x-www-form-urlencoded', "Authorization": "Basic " + btoa(`${tokenAPIKey}:${tokenAPISecret}`) }
    return this.postData(this.tokenURL+"grant_type=client_credentials&scope=" + this.scope, headers);
  }


  getExchangeRate(){
    if(!this.authToken){
      this.getBearToken().then(x => {console.log(x); this.authToken = x});
    }
    const url = this.domian + this.ENDPOINT.EXCHANGE_RATE + "?currencycd=ntd";
    const headers = {"X-DFS-API-PLAN": this.HEADER_PLAN.EXCHANGE_RATE, "Authorization": "Bearer " + this.authToken }
    console.log("headers", headers)
    return this.getData(url, headers )
  }

  postData(url, data, extendHeader){
    const allHeader = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            ...extendHeader
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    };
    console.log("allHeader", allHeader)

    return fetch(url, allHeader)
    .then(response => response.json());
  }
  getData(url, extendHeader){

    const allHeader = {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            ...extendHeader
            // "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    // console.log("allHeader", allHeader)
    //
    // return fetch(url, allHeader)
    // .then(response => { console.log("response", response); response.json()});

    $.ajax({
       url: url,

       type: 'GET',
       headers: allHeader,
       success: function(response) {
         console.log(response);
       },
       error: function(error) {
       }
      });


  }



}
