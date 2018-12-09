import React, { Component } from 'react';
import { BrowserRouter,
         Route,
         Switch } from 'react-router-dom';
import Home from './components/Home';
import ListPlaces from './components/ListPlaces';
import HaggleView from './components/HaggleView';
import MapView from './components/MapView';
import Feedback from './components/Feedback';

import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
         <Switch>
           <Route exact path={'/'} component={(props) =><Home {...props}/>} />
           <Route exact path={'/feedback'} component={(props) =><Feedback {...props}/>} />
           <Route exact path={'/place'} component={(props) =><ListPlaces {...props}/>} />
           <Route exact path={'/haggle'} component={(props) =><HaggleView {...props}/>} />
           <Route exact path={'/map'} component={(props) =><MapView {...props}/>} />
           <Route component={Home} />
         </Switch>
       </BrowserRouter>
    );
  }
}

export default App;
