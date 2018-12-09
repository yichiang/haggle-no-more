import React, { Component } from 'react';
import './../styles/App.css';
import Footer from './Footer';
import ListIcon from './../images/List_Icon.svg';
import ReactSVG from 'react-svg'
import './../styles/Merchants.css'

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
      width: '100%',
      height: 50,
      textAlign: 'center',
      color: 'white',
      fontSize: 25,
      paddingTop: '5px'
    }
    
    return (
      <div>
        <div className="top" style={topStyle}>
          <p className="topText">Bangkok Markets</p>
        </div>
      
      <div className="second_handler" >
      <div></div>
        <ReactSVG src={ListIcon} className="clickableIcon" onClick={() => this.props.history.push('/place')}/>
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
