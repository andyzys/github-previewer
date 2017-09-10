import React from 'react';

let PlayerBattleConfirm = (props) => {
  return (
    <div>
      <img className="user-icon"
        src={props.data.avatar_url} alt=""/>
      <p className="name">{`@${props.data.login}`}</p>
    </div>
  )
}

export default PlayerBattleConfirm;
