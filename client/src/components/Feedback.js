import React, { Component } from 'react';
import { Divider, Grid } from 'semantic-ui-react'
import $ from 'jquery'
import ReactSVG from 'react-svg'
import Price from './../images/Price.svg';
import Markets from './../images/Markets.svg';
import Guide from './../images/Guide.svg';
import './../styles/Feedback.css'


class Feedback extends Component {

constructor(){
  super();
  this.state = {

  }
}
componentDidMount() {

}

  render() {
    return (
      <div>

      <div className="top_header">Bankok Markets</div>
      <div>
      <div className="main_feedback_body">
        <div className="main_feedback_q">
          <p>Did you make a purchase at Market 2?</p>
          <div className="all_feedback_selection">
          <div className="feedback_selection">
          yes
          </div>
          <div className="feedback_selection">
          no
          </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Feedback;
