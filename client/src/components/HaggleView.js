import React, { Component } from 'react';
import './../styles/App.css';
import { Divider, Button } from 'semantic-ui-react'
class HaggleView extends Component {

constructor(){
  super();
  this.state = {
    propsedValues: 0
  }
  this.allButtons = this.getNumbers();
}
componentDidMount() {

  fetch('http://localhost:4200/getExchangeRate', {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
  })
  .then(response => { console.log("response", response); response.json()})
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
