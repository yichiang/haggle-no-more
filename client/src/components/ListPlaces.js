import React, { Component } from 'react';
import './../styles/App.css';
import { Divider } from 'semantic-ui-react'
import DiscoverHttp from './../extension/discoverHttp'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import './../styles/Merchants.css'
import ReactSVG from 'react-svg'
import MapIcon from './../images/Map_icon.svg';
import MerchItem from './MerchItem'
var config = {
  GOOGLE_API_KEY: 'AIzaSyCZppRF9ySpc8AEdX8qS-1xJF0NdSWbND8'
}

class ListPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currLocs: [],
      allLocs: []
    }
  }

  getGooglePlaceInformation(address, points){
    console.log(address, points)
    var url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address.join('+')}&location=${points[0]},${points[1]}&radius=10000&key=` + config.GOOGLE_API_KEY;
    var discoverHttp = new DiscoverHttp();
    discoverHttp.getData(url, {}).then(pla => console.log(pla))
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
              .then(r => {
                this.state.currLocs.map((x, i) => {
                  if(i > 10){
                    return x;
                  }else{
                    console.log(x)
                    this.getGooglePlaceInformation(x.address1, x.point)
                    return x;
                  }

                })
              })

  }


  render() {
    let idIter = 0
    const Places = () => {
      const merItems = this.state.currLocs.map(m => {
        idIter++;
        return <MerchItem idIter={idIter} m={m} locStyle={locStyle}/>
      })

      return (
        <ul className="metchant_parents">{merItems}</ul>
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


    const dropOptions = [
      { value: 'retail', label: 'Retail' },
      { value: 'restaurants', label: 'Restaurants' },
      { value: 'hotels', label: 'Hotels' }
    ]
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
          <p className="topText">Bankok Markets</p>
        </div>

    <div className="second_handler" >
    <div className="filter" style={{fontSize: 25}}>
      <Dropdown options={dropOptions} value={dropOptions[0]}
      onChange={dropDownHandler}
       placeholder="Filter by Merchants"/>
    </div>
    <ReactSVG src={MapIcon} onClick={() => this.props.history.push('/map')}/>

    </div>

        <Places style={placesStyle} />
      <Divider/>
      </div>
    );
  }
}

export default ListPlaces;
