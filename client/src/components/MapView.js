import React, { Component } from 'react';
import './../styles/App.css';

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
          src="localhost:3000/maps/index.html"
          style={mapContainer}
        ></iframe>
      </div>
    );
  }
}

export default MapView;
