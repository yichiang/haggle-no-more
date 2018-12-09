import React, { Component } from 'react';
import './../styles/App.css';
import { Divider } from 'semantic-ui-react'
import DiscoverHttp from './../extension/discoverHttp'
import Dropdown from 'react-dropdown';


class ListPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currLocs: [],
      allLocs: []
    }
  }

  componentDidMount(){

    var discoverHttp = new DiscoverHttp();
    let res = discoverHttp.getCityGuide("bangkok")
              .then(obj => {
                obj = JSON.parse(obj)
                this.setState({allLocs: obj})
                // console.log(obj)
                return obj.result.filter(loc => {
                  return loc.mcc === "retail"
                })
              })
              .then(r => this.setState({currLocs: r}))
  }


  render() {
    let idIter = 0
    const Places = () => {
      const merItems = this.state.currLocs.map(m => {
        idIter++;
        return <li key={idIter} style={locStyle} className="locItem">
                  {m.website 
                    ? <a href={m.website}><h3>{m.name}</h3></a> 
                    : <h3 style={{color:'#4183C6'}}>{m.name}</h3>}
                  <p> Address: {m.address1}</p>
              </li>
      })

      return (
        <ul style={placesStyle}>{merItems}</ul>
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

    const placesStyle = {
      padding: '20px',
      marginBottom: 10,
      border: 'solid',
      borderColor: '#0b3c5d',
      borderWidth: 1,
      position: 'relative',
      display: 'block',
      listStyleType: 'none'
    }

    const locStyle = {
      borderColor: 'white',
    }


    const dropOptions = ['retail', 'restaurants', 'hotels']

    const dropDownHandler = (selected) => {
      console.log(this.state.allLocs.result)
      var s = this.state.allLocs.result.filter(loc => { 
        return loc.mcc === selected.value
      })
      this.setState({currLocs: s})
    }
    
    return (
      <div className="listPlaces">
        <div className="top" style={topStyle}>
          <p className="topText">Top Banner Text</p>
        </div>

        <div className="filter" style={{fontSize: 25}}>
          <Dropdown options={dropOptions} value={"Filter"} 
          onChange={dropDownHandler} />
        </div>

        <Places style={placesStyle} />
      <Divider/>
      </div>
    );
  }
}

export default ListPlaces;
