import React, { Component } from 'react';
import './../styles/App.css';
import Footer from './Footer';

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

    const topStyle = {
      backgroundColor: '#EC6434',
      // marginTop: -42,
      width: '100%',
      height: 50,
      textAlign: 'center',
      color: 'white',
      fontSize: 30

    }
    return (
      <div>
        <div className="top" style={topStyle}>
          <p className="topText">Bangkok Markets</p>
        </div>

        <iframe 
          title="Leaflet map of location with markets marked"
          src="https://s3.amazonaws.com/discoverhack/maps/index.html"
          style={mapContainer}
        ></iframe>
        <div><Footer {...this.props}/></div>

      </div>
    );
  }
}

export default MapView;
