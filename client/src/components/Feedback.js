import React, { Component } from 'react';
import { Divider, Grid, Icon } from 'semantic-ui-react'
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
      'q': 'Did you pay with cash or card?',
      'optionsType': 'binary',
      'options': ['cash', 'card'],
      'iconNames' : ['money bill alternate outline', 'credit card']

    },
    {
      'q': 'How much discount did you receive?',
      'optionsType': 'multi',
      'options': ['0-30%', '30-60%', '60-90%']

    },
    {
      'q': 'Super awesome! You\'re in the top 25% of bargainers in this market!',
      'optionsType': 'multi',
      'options': ['Yay! 👍']

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

      <div className="top_header">Bangkok Markets</div>
      <div>
      <div className="main_feedback_body">
        <div className="main_feedback_q">
          <p>{currentQ.q}</p>
          {currentQ.optionsType === 'binary' ?
            <div className="all_feedback_selection">
            {currentQ.options && currentQ.options.map((x, i) =>
               <div className="feedback_selection"  onClick={this.onPressSubmit}>
               {currentQ.iconNames && <Icon name={currentQ.iconNames[i]}/> }{x}
               </div>
             )}
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
