import React, { Component } from 'react';
import './../styles/App.css';
import { Divider, Button } from 'semantic-ui-react'

class MapView extends Component {

  render() {
    var page = require('../maps/index.html');
    function createMarkup() { return {__html: 'First &middot; Second'}; };
    return (
      <div>
        {/* <div dangerouslySetInnerHTML={createMarkup()} /> */}
        <iframe src={page}></iframe>
      </div>
    );
  }
}

export default MapView;
