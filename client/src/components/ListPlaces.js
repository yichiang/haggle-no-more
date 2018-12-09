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
import Footer from './Footer';
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
    var self = this;
    var  currLocs =  self.state.currLocs
  
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
         for (var j = 0; j < pla.results.length; j++) {
           if(j === 0){

             currLocs[i].rating = pla.results[0].rating || 0;
             currLocs[i].place_id = pla.results[0].place_id || 'n/a';
             currLocs[i].reference = pla.results[0].reference || 'n/a';
             const photos = pla.results[0].photos
             if(photos && photos.length){
               currLocs[i].photo_reference  = photos[0].photo_reference;
             }
           }else{

             var  currLocsNew = {}
             currLocsNew.address1 = pla.results[j].formatted_address? pla.results[j].formatted_address.split('Bangkok')[0] : '';
             currLocsNew.name = pla.results[j].name || 0;
             currLocsNew.card_network = 'UnKnown';
             currLocsNew.point = [pla.results[j].geometry.location.lat, pla.results[j].geometry.location.lng];

             currLocsNew.mcc = currLocs[0].mcc;

             currLocsNew.rating = pla.results[j].rating || 0;
             currLocsNew.place_id = pla.results[j].place_id || 'n/a';
             currLocsNew.reference = pla.results[j].reference || 'n/a';

             currLocs.unshift(currLocsNew)
           }
         }

         self.setState({currLocs: currLocs})
       }
        return response
      },
      error: function(error) {
      }
     });


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
          <p className="topText">Bangkok Markets</p>
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
      <div><Footer {...this.props}/></div>
      </div>
    );
  }
}

export default ListPlaces;
