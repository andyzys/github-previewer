import React from 'react';

require('../style/home.less')

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className="home-container">
        <p className="center">This is a intresting project.</p>
        <p className="center">You can battle others at battle tab. Whoose score is higher?</p>
        <p className="center">And you can view most famous projects on each specified language.</p>
        <p className="center">Last you can know great people that own most followers on github.</p>
        <p className="center">Now exploring it! </p>
      </div>
    )
  }
}
