import React from 'react';

export default class GreatPeopleItem extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    let data = this.props.data.people;
    let index = this.props.data.index;
    return(
      <div className="greatPeopleItem">
        <h2 className="rank">{index + 1}</h2>
        <img className="user-icon"
          src={data.avatar_url} alt=""/>
        <a href={data.html_url} target="__blank">
          <p className="login">{data.login}</p>
        </a>
      </div>
    )
  }
}
