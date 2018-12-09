import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import ReactSVG from 'react-svg'
import Price from './../images/Price.svg';
import Markets from './../images/Markets.svg';
import Guide from './../images/Guide.svg';


class Footer extends Component {

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

      <Grid columns='three'  className="g_footer">
        <Grid.Row>
          <Grid.Column className="g_icon_column">
            <ReactSVG src={Markets}/>
          </Grid.Column>
          <Grid.Column className="g_icon_column">
            <ReactSVG src={Price}/>
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
