import React, { Component } from 'react';
import './../styles/App.css';
import { Divider, Button } from 'semantic-ui-react'
import $ from 'jquery'
import DiscoverHttp from './../extension/discoverHttp'


class HaggleView extends Component {

constructor(){
  super();
  this.state = {
    propsedValues: 0,
    convertValues: 0,
    exchange_rate: 0,
    currencycd: "THB"
  }
  this.allButtons = this.getNumbers();
}
componentDidMount() {
    var discoverHttp = new DiscoverHttp();
    var self = this;
    discoverHttp.getExchangeRate(this.state.currencycd).done(data => {
      console.log("data.exchange_rate",JSON.parse(data).exchange_rate)
      self.setState({exchange_rate: JSON.parse(data).exchange_rate})

    });
}

handleNumber(number){
  const currentDisplayVal = this.state.propsedValues * 10 +  number;
  console.log("this.state.exchange_rate", this.state.exchange_rate)
  console.log(currentDisplayVal * this.state.exchange_rate)
  this.setState({
    propsedValues: currentDisplayVal,
    convertValues: currentDisplayVal * this.state.exchange_rate
  });
 }

 onHandleAction(action){
   if(action === 'back'){
     this.setState({ propsedValues: parseInt(this.state.propsedValues / 10) });
   }
   // else if(action === 'convert'){
   //   this.setState({ convertValues: this.setate.propsedValues * this.state.exchange_rate });
   //
   // }
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
  this.handleNumber(value)
}
  render() {
    return (
      <div>
        <div>${this.state.propsedValues}</div>
        {this.allButtons.map(x => <Button key={x} onClick={() => this.OnPressChangeVal(x)}>{x}</Button>)}
        <Button  onClick={() => this.onHandleAction('back')}>Back</Button>
        <Button onClick={() => this.onHandleAction('convert')}>Convert</Button>
        <Divider/>
        <div>{this.state.currencycd} {this.state.convertValues.toFixed(2).toLocaleString()}</div>
        <div>
      </div>
      </div>
    );
  }
}

export default HaggleView;
