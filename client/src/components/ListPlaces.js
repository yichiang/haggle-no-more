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
import $ from 'jquery'


class ListPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currLocs: [],
      allLocs: []
    }
  }

  getGooglePlaceInformation(i, address, points){
    var self = this
    var discoverHttp = new DiscoverHttp();
    var url = discoverHttp.domian + `googlePlace?query=${address.split(' ').join('+')}&location=${points[0]},${points[1]}`;
    var urlImage = discoverHttp.domian + `googlePlaceImage?photo_reference=`;
    $.ajax({
      url: url,

      type: 'GET',
      success: function(response) {
        var pla = $.parseJSON(response);
;
       if(pla.results){
       var  currLocs =  self.state.currLocs
       currLocs[i].rating = pla.results[0].rating;
       currLocs[i].place_id = pla.results[0].place_id;
       currLocs[i].reference = pla.results[0].reference;
       const photos = pla.results[0].photos;
       if(photos && photos.length){
         currLocs[i].photo_reference  = photos[0].photo_reference;
         $.ajax({
            url: urlImage+photos[0].photo_reference,

            type: 'GET',
            success: function(response) {
             //  console.log(response);
             currLocs[i].imageBinary = response;
             console.log("currLocs[i].imageBinary", currLocs[i].imageBinary);
             self.setState({currLocs: currLocs})

              return response
            },
            error: function(error) {
            }
           });

       }
       console.log("currLocs", currLocs[i])
       self.setState({currLocs: currLocs})
       }
        return response
      },
      error: function(error) {
      }
     });

    // var discoverHttp = new DiscoverHttp();
    //
    // discoverHttp.getData(, {}))
    // .then(pla => {
    //   console.log("pla",pla)
    //
    //   if(pla.results){
    //   var  currLocs =  this.state.currLocs
    //   currLocs[i].rating = pla.results[0].rating;
    //   currLocs[i].place_id = pla.results[0].place_id;
    //   currLocs[i].reference = pla.results[0].reference;
    //   console.log("currLocs", currLocs[i])
    //   this.setState({currLocs: currLocs})
    //   }
    // })
  }


  componentDidMount(){
    var discoverHttp = new DiscoverHttp();
    var self = this;

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
                self.setDataPlaces();
              })

  }

setDataPlaces(){
  var self = this;

  console.log("x!!!", this.state.currLocs)

  this.state.currLocs.map((x, i) => {

    if(i > 2){
      return x;
    }else{
      console.log("x!!!", i)

      self.getGooglePlaceInformation(i, x.address1, x.point)
      return x;
    }

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
      this.setDataPlaces();

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
