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
    questions: [{
      'q': 'Did you make a purchase at Market 2?',
      'optionsType': 'binary'
    },
    {
      'q': 'How much discount did you receive?',
      'optionsType': 'multi',
      'options': ['0-30%', '30-60%', '60-90%']

    }
  ],
    currentQuestions: 0,
  }

  this.onPressSubmit = this.onPressSubmit.bind(this)
}
componentDidMount() {

}

onPressSubmit(){
  const nextQNum = this.state.currentQuestions + 1
  if(nextQNum < this.state.questions.length){
    this.setState({currentQuestions: nextQNum})
  }else{
    this.props.history.push('/place')
  }
}

  render() {
    const currentQ = this.state.questions[this.state.currentQuestions]
    return (
      <div>

      <div className="top_header">Bankok Markets</div>
      <div>
      <div className="main_feedback_body">
        <div className="main_feedback_q">
          <p>{currentQ.q}</p>
          {currentQ.optionsType === 'binary' ?
            <div className="all_feedback_selection">
            <div className="feedback_selection" onClick={this.onPressSubmit}>
            yes
            </div>
            <div className="feedback_selection" onClick={this.onPressSubmit}>
            no
            </div>
            </div>
            :
            <div className="all_feedback_selection all_feedback_selection_col">
            {currentQ.options && currentQ.options.map(x =>
               <div className="feedback_selection"  onClick={this.onPressSubmit}>
               {x}
               </div>
             )}
            </div>
          }

          </div>



            </div>
            </div>
            </div>
    );
  }
}

export default Feedback;
