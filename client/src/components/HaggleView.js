import React, { Component } from 'react';
import './../styles/App.css';
import { Divider, Button, Flag } from 'semantic-ui-react'
import $ from 'jquery'
import DiscoverHttp from './../extension/discoverHttp'
import Send_Button from './../images/Send_Button.svg';
import Check_Button from './../images/Check_Button.svg';
import X_Button from './../images/X_Button.svg';
import Back_Button from './../images/delete.svg';
import ReactSVG from 'react-svg'
import Footer from './Footer';

class HaggleView extends Component {

constructor(){
  super();
  this.state = {
    propsedValues: 0,
    convertValues: 0,
    exchange_rate: 0,
    currencycd: "THB",
    showOffer: false,
    reverseOffer: false,
    appendClassName: '',
  }
  this.allButtons = this.getNumbers();
  this.offerMake = this.offerMake.bind(this)
  this.rejectOffer = this.rejectOffer.bind(this);
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
  this.setState({appendClassName: 'an_c_ca'})
  const currentDisplayVal = this.state.propsedValues * 10 +  number;
  console.log("this.state.exchange_rate", this.state.exchange_rate)
  console.log(currentDisplayVal / this.state.exchange_rate)
  this.setState({
    propsedValues: currentDisplayVal,
    convertValues: currentDisplayVal / this.state.exchange_rate
  });
  var self =this;
  setTimeout(() =>self.setState({appendClassName: ''}),2000)
 }

 onHandleAction(action){
   if(action === 'back'){
     const currentDisplayVal = parseInt(this.state.propsedValues / 10)

     this.setState({ propsedValues: currentDisplayVal ,
       convertValues: currentDisplayVal * this.state.exchange_rate

     });
   }
   else if(action === 'offer'){
     this.setState({ showOffer: true });

   }
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

offerMake(){
  this.props.history.push('/feedback')

}

rejectOffer(){
  this.setState({reverseOffer: !this.state.reverseOffer})
}
  render() {
    return (
      <div className={this.state.reverseOffer? 'reverseOffer-view': ''}>
      {this.state.showOffer &&
        <div className={this.state.reverseOffer? "offer_panel_reverse":"offer_panel"}>
        <div className="offer_inner">
        <p className="client_view_price" style={{margin: 0}}>
        ฿ {this.state.convertValues.toFixed(2).toLocaleString()}
        </p>

        {this.state.reverseOffer && <p className="client_view_price client_view_price_small" style={{margin: 0}}>
        $ ({this.state.propsedValues.toFixed(2).toLocaleString()})
        </p>}

        <div className="group_button">
        <div className="clickableIcon" onClick={this.offerMake}>
        <ReactSVG src={Check_Button}
        svgStyle={{ width: 50 }}
        />
        </div>
        <div  className="clickableIcon" onClick={this.rejectOffer}>
        <ReactSVG src={X_Button}
        svgStyle={{ width: 50 }}
        />
        </div>
      </div>
      </div>
        </div>
      }
      <div className={this.state.showOffer? ("cal_main cal_main_openOffer" +( this.state.reverseOffer? ' cal_main_openOffer_reverse' : '')): "cal_main"}>
      <div className="cal_main_wrap">
      <div className="cal_display">
      <div><Flag name='th'  svgStyle={{ width: 25 }} /></div>

        <p>฿ {this.state.convertValues.toFixed(2).toLocaleString()}</p>
      </div>
      <div className={"cal_display " + this.state.appendClassName }>

        <div><Flag name='us'  svgStyle={{ width: 25 }} /></div>

          <p>${this.state.propsedValues.toFixed(2).toLocaleString()}</p>
        </div>
        </div>
<div style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
  <div className="">
  <div className="cal_row">
    <p className="letter_square" onClick={() => this.OnPressChangeVal(1)}>1</p>
    <p className="letter_square" onClick={() => this.OnPressChangeVal(2)}>2</p>
    <p className="letter_square" onClick={() => this.OnPressChangeVal(3)}>3</p>
  </div>
  <div className="cal_row">
    <p className="letter_square" onClick={() => this.OnPressChangeVal(4)}>4</p>
    <p className="letter_square" onClick={() => this.OnPressChangeVal(5)}>5</p>
    <p className="letter_square" onClick={() => this.OnPressChangeVal(6)}>6</p>
  </div>
  <div className="cal_row">

    <p className="letter_square" onClick={() => this.OnPressChangeVal(7)}>7</p>
    <p className="letter_square" onClick={() => this.OnPressChangeVal(8)}>8</p>
    <p className="letter_square" onClick={() => this.OnPressChangeVal(9)}>9</p>
  </div>
  <div className="cal_row">

    <p className="letter_square" onClick={() => this.onHandleAction(',')}>,</p>
    <p className="letter_square" onClick={() => this.OnPressChangeVal(0)}>0</p>
    <p className="letter_square" onClick={() => this.onHandleAction('.')}>.</p>
  </div>


</div>
<div  className="cal_col_test">
<p className="letter_square" onClick={() => this.onHandleAction('back')}>
<ReactSVG src={Back_Button} svgStyle={{ width: 40 }}/>
</p>
<p className="letter_square letter_icon" onClick={() => this.onHandleAction('offer')}>
<ReactSVG src={Send_Button}
svgStyle={{ width: 40 }}

/>
</p>
</div>
</div>

      </div>
        <Footer {...this.props}/>

      </div>
    );
  }
}
// {this.allButtons.map(x => <Button key={x} onClick={() => this.OnPressChangeVal(x)}>{x}</Button>)}

export default HaggleView;
