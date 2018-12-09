import React, { Component } from 'react';
import './../styles/App.css';
import { Divider } from 'semantic-ui-react'
import MerchItem from './MerchItem';
import DiscoverHttp from './../extension/discoverHttp'


class ListPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchesArray: [
        {name:'Bob Shop', id: 1},
        {name: 'John Store', id: 2}
      ]
    }
  }



  componentDidMount(){

    var discoverHttp = new DiscoverHttp();
    let res = discoverHttp.getCityGuide("bangkok");
    console.log(JSON.stringify(res, undefined, 2))
  }


  render() {
    const PlaceLists = () => {
      const merItems = this.state.merchesArray.map(m => {
        return <li key={m.id}>{m.name}</li>
      })

      return (
        <ul>{merItems}</ul>
      )
    }
    
    return (
      


      <div className="HaggleContainer">
        <PlaceLists />
      <Divider/>
      </div>
    );
  }
}

export default ListPlaces;
