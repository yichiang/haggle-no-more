import React, { Component } from 'react';
import './../styles/App.css';
import { Divider } from 'semantic-ui-react'
import MerchItem from './MerchItem';

class ListPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchesArray: [
        {name:'Bob Shop', id: 1},
        {name: 'John Store', id: 2}
      ]
    }



    const PlaceLists = () => {
      const merItems = this.state.map(m => {
        return <li>{m.name}</li>
      })

      return (
        <ul>{merItems}</ul>
      )



      // this.state.merchesArray.map(merch => {
      //   <MerchItem item={merch} id={merch.id}/>
      // })
    }

    const onPlaceClick = () => {
      return null
    }
  }

  componentDidMount(){
    fetch()
  }


  render() {
    return (



      <div class="HaggleContainer">
        <PlaceLists />
      <Divider/>
      </div>
    );
  }
}

export default ListPlaces;
