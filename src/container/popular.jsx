import React from 'react';
import {
  NavLink,
  Route
} from 'react-router-dom';

import ProjectList from '../component/ProjectList'

require('../style/popular.less');

export default class Popular extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  componentDidMount() {
  }
  render() {
    return(
      <div className="popular-container">
        <ul className="popular-navlink">
          <li>
            <NavLink activeClassName="navink-active" to={`${this.props.match.url}/All`}>All</NavLink>
          </li>
          <li>
            <NavLink activeClassName="navink-active" to={`${this.props.match.url}/JavaScript`}>JavaScript</NavLink>
          </li>
          <li>
            <NavLink activeClassName="navink-active" to={`${this.props.match.url}/HTML`}>HTML</NavLink>
          </li>
          <li>
            <NavLink activeClassName="navink-active" to={`${this.props.match.url}/CSS`}>CSS</NavLink>
          </li>
          <li>
            <NavLink activeClassName="navink-active" to={`${this.props.match.url}/TypeScript`}>TypeScript</NavLink>
          </li>
          <li>
            <NavLink activeClassName="navink-active" to={`${this.props.match.url}/Java`}>Java</NavLink>
          </li>
          <li>
            <NavLink activeClassName="navink-active" to={`${this.props.match.url}/PHP`}>PHP</NavLink>
          </li>
          <li>
            <NavLink activeClassName="navink-active" to={`${this.props.match.url}/Python`}>Python</NavLink>
          </li>
          <li>
            <NavLink activeClassName="navink-active" to={`${this.props.match.url}/Ruby`}>Ruby</NavLink>
          </li>
          <li>
            <NavLink activeClassName="navink-active" to={`${this.props.match.url}/C#`}>C#</NavLink>
          </li>
          <li>
            <NavLink activeClassName="navink-active" to={`${this.props.match.url}/C++`}>C++</NavLink>
          </li>
          <li>
            <NavLink activeClassName="navink-active" to={`${this.props.match.url}/C`}>C</NavLink>
          </li>
          <li>
            <NavLink activeClassName="navink-active" to={`${this.props.match.url}/Swift`}>Swift</NavLink>
          </li>
        </ul>
        <div>
          <Route
            path={`${this.props.match.url}/:language`}
            render={props => <ProjectList {...props}></ProjectList>}
          ></Route>
          <Route exact
            path={this.props.match.url}
            render={() => (
              <div className="screen-center">Please choose one language</div>
            )}
            ></Route>
        </div>
      </div>
    )
  }

}
