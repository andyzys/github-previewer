import React from 'react';
import {
  HashRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';

require('./style/reset.less');
require('./style/app.less');

import Home from './container/home';
import Battle from './container/battle';
import Popular from './container/popular';
import GreatPeople from './container/greatPeople';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Router>
        <div style={{minHeight: '100%'}}>
          <ul className="topbar">
            <li>
              <NavLink to="/home" activeClassName="navink-active">Home</NavLink>
            </li>
            <li>
              <NavLink to="/battle" activeClassName="navink-active">Battle</NavLink>
            </li>
            <li>
              <NavLink to="/popular" activeClassName="navink-active">Popular</NavLink>
            </li>
            <li>
              <NavLink to="/greatPeople" activeClassName="navink-active">Great People</NavLink>
            </li>
          </ul>
          <div className="content-container">
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/battle" component={Battle} />
            <Route path="/popular" component={Popular} />
            <Route path="/greatPeople" component={GreatPeople} />
          </div>
        </div>
      </Router>
    )
  }
}
