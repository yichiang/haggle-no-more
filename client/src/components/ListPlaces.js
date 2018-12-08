import React, { Component } from 'react';
import './../styles/App.css';
import { Divider } from 'semantic-ui-react'
import MerchItem from 'MerchItem';

class ListPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchesArray: [
        {name:'Bob Shop', id: 1},
        {name: 'John Store', id: 2}
      ]
    }


    
    const PlaceLits = () => {

      merchesArray.map(merch => {
        <MerchItem onCLick={} item={merch} id={merch.id}/>

      })
    }
  }

  componentDidMount(){
    fetch()
  }


  render() {
    return (



      <div class="HaggleContainer">
        {PlaceLits}
      <Divider/>
      </div>
    );
  }
}

export default ListPlaces;
