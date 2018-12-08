import React, { Component } from 'react';
import './../styles/App.css';
import { Divider, Button } from 'semantic-ui-react'
import $ from 'jquery'
import DiscoverHttp from './../extension/discoverHttp'


class HaggleView extends Component {

constructor(){
  super();
  this.state = {
    propsedValues: 0
  }
  this.allButtons = this.getNumbers();
}
componentDidMount() {



    var discoverHttp = new DiscoverHttp();
    discoverHttp.getExchangeRate("TWD");
}

getNumbers(){
  var allButtons = [];
   for (var i = 1; i < 10; i++) {
     allButtons.push(i)
   }
   return allButtons;
}
OnPressChangeVal(value){
  console.log(value)
  this.setState({propsedValues: value})
}
  render() {
    return (
      <div>
        <div>${this.state.propsedValues}</div>
        {this.allButtons.map(x => <Button key={x} onClick={() => this.OnPressChangeVal(x)}>{x}</Button>)}
        <Divider/>
        <div>
      </div>
      </div>
    );
  }
}

export default HaggleView;
