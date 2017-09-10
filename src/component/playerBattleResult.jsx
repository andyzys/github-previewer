import React from 'react';

let PlayerBattleResult = (props) => {
  let info = props.data;
  return (
    <div>
      <p className="result">{props.isWinner ? 'Winner' : 'Loser'}</p>
      <h3 className="score">{`Score: ${props.score}`}</h3>
      <img className="user-icon" src={info.avatar_url} alt=""/>
      <p className="login">{`@ ${info.login}`}</p>
      <p className="fullname">{info.name}</p>
      <p className="location">{`location: ${info.location}`}</p>
      <p className="follower">{`followers: ${info.followers}`}</p>
      <p className="following">{`following: ${info.following}`}</p>
      <p className="public-repos">{`Public Repos: ${info.public_repos}`}</p>
    </div>
  )
}

export default PlayerBattleResult;
