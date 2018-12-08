import React, { Component } from 'react';
import { BrowserRouter,
         Route,
         Switch } from 'react-router-dom';
import Home from './components/Home';
import ListPlaces from './components/ListPlaces';
import HaggleView from './components/HaggleView';

import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
         <Switch>
           <Route exact path={'/'} component={() =><Home/>} />
           <Route exact path={'/place'} component={(props) =><ListPlaces {...props}/>} />
           <Route exact path={'/haggle'} component={(props) =><HaggleView {...props}/>} />
           <Route component={Home} />
         </Switch>
       </BrowserRouter>
    );
  }
}

export default App;
