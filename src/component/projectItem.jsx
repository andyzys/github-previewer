import React from 'react';

require('../style/projectItem.less');

let ProjectItem = (props) => {
  let item = props.data.item;
  return(
    <div className="project-item">
      <h3 className="rank">{props.data.index + 1} #</h3>
      <img className="avatar" src={item.owner.avatar_url} alt=""/>
      <a href={item.html_url}>
        <p className="name">
          {item.name}
        </p>
      </a>
      <p className="author">{`@${item.owner.login}`}</p>
      <p className="star-count">{`${item.stargazers_count} stars`}</p>
    </div>
  )
}

export default ProjectItem
