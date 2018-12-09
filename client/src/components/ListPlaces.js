import React, { Component } from 'react';
import './../styles/App.css';
import { Divider } from 'semantic-ui-react'
import DiscoverHttp from './../extension/discoverHttp'


class ListPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchesArray: [
        // {name:'Bob Shop', id: 1},
        // {name: 'John Store', id: 2}
      ],
      
    }
  }



  componentDidMount(){

    var discoverHttp = new DiscoverHttp();
    let res = discoverHttp.getCityGuide("bangkok")
              // .done(res => JSON.parse(res))
              .then(obj => {
                obj = JSON.parse(obj)
                // console.log(obj)
                return obj.result.filter(loc => {
                  return loc.mcc === "retail"
                })
              })
              .then(r => this.setState({merchesArray: r}))
  }


  render() {
    let idIter = 0
    const PlaceLists = () => {
      const merItems = this.state.merchesArray.map(m => {
        idIter++;
        return <li key={idIter}>
                  <h3>{m.name}</h3>
                  <p> Address: {m.address1}</p>
              </li>
      })

      return (
        <ul>{merItems}</ul>
      )
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
      <div className="listPlaces">
        <div className="top" style={topStyle}>
          Top Banner
        </div>

        <div className="filter">
          Filter Banner
        </div>

        <PlaceLists />
      <Divider/>
      </div>
    );
  }
}

export default ListPlaces;
