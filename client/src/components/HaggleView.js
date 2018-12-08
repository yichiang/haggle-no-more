import React, { Component } from 'react';
import './../styles/App.css';
import { Divider } from 'semantic-ui-react'
import DiscoverHttp from './../extension/discoverHttp'
class HaggleView extends Component {


componentDidMount() {
  var discoverHttp = new DiscoverHttp();
  discoverHttp.getData('http://localhost:4200/getExchangeRate').then(res => console.log(res));
}


  render() {
    return (
      <div>
      $10
      <Divider/>
      </div>
    );
  }
}

export default HaggleView;
