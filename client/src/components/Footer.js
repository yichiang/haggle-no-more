import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import ReactSVG from 'react-svg'
import Price from './../images/Price.svg';
import Markets from './../images/Markets.svg';
import Guide from './../images/Guide.svg';
import './../styles/App.css';

class Footer extends Component {

constructor(props){
  super(props);
  console.log(props)
  this.state = {

  }
}
componentDidMount() {

}

  render() {
    return (
      <div className="footerDiv">
      <Grid columns='three'  className="g_footer">
        <Grid.Row>
          <Grid.Column className="g_icon_column">
            <ReactSVG src={Markets} onClick={() => {
              this.props.history.push('/place')
            }}/>
          </Grid.Column>
          <Grid.Column className="g_icon_column">
            <ReactSVG src={Price} onClick={() => {
                this.props.history.push('/haggle')
            } }/>
          </Grid.Column>
          <Grid.Column className="g_icon_column">
            <ReactSVG src={Guide}/>
          </Grid.Column>
        </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Footer;
