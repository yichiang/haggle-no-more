import React, { Component } from 'react';
import './../styles/App.css';
import { Divider, Button } from 'semantic-ui-react'

class MapView extends Component {

  render() {
    const mapContainer = {
      height: '100%',
      width: '100%',
      border: 0,
      margin: 0,
      position: 'fixed',
      overflowY: 'hidden'
    }
    return (
      <div>
        {/* <div dangerouslySetInnerHTML={createMarkup()} /> */}
        <iframe 
          src="https://s3.amazonaws.com/discoverhack/maps/index.html"
          style={mapContainer}
        ></iframe>
      </div>
    );
  }
}

export default MapView;
