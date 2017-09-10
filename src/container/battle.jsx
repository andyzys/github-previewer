import React from 'react';

import PlayerBattleConfirm from '../component/playerBattleConfirm';
import PlayerBattleResult from '../component/playerBattleResult';

import * as fetchData from '../util/fetchData';

require('../style/battle.less');

export default class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 第一阶段：输入
      playerOneName: '',
      playerTwoName: '',
      playerOneInfo: null,
      playerTwoInfo: null,
      // 第二阶段：确认
      playerOneConfirm: false,//控制player one显示确认界面
      playerTwoConfirm: false,//控制player two显示确认界面
      // 第三阶段：评比
      playerOneResult: false,// 控制player one显示结果界面
      playerTwoResult: false,// 控制player two显示结果界面
      playerOneScore: 0,
      playerTwoScore: 0,
      battleResult: 0,// 比较结果 1 一号玩家赢了 2 二号玩家赢了
    }
  }
  render() {
    let com = null;
    let playerOne = null, playerTwo = null;
    if(false == this.state.playerOneConfirm && false == this.state.playerOneResult) {
      playerOne = <div className="battle-input-container">
                    <div className="input-player">
                      <p className="input-title">Player one:</p>
                      <input type="text"
                        className="input-content"
                        placeholder="github username"
                        onChange={(event) => {
                          this.setState({
                            playerOneName: event.target.value
                          });
                        }}/>
                      <button
                        disabled={this.state.playerOneName.length == 0 ? 'disabled' : ''}
                        className={this.state.playerOneName.length == 0 ? 'battle-submit-disable input-submit' : "input-submit"}
                        onClick={() => {
                          this.handleConfirm(1);
                        }}>
                        submit
                      </button>
                    </div>
                  </div>
    }
    if(true == this.state.playerOneConfirm && false == this.state.playerOneResult) {
      playerOne = <div className="confirm-player">
                    <PlayerBattleConfirm data={this.state.playerOneInfo}/>
                    <button className="reset-btn"
                      onClick={() => {
                        this.setState({
                          playerOneConfirm: false
                        })
                      }}
                      >reset</button>
                  </div>
    }
    if(false == this.state.playerOneConfirm && true == this.state.playerOneResult) {
      playerOne = <div className="battle-result-container">
                    <PlayerBattleResult
                      data={this.state.playerOneInfo}
                      isWinner={this.state.battleResult == 1 ? true : false}
                      score={this.state.playerOneScore}
                    />
                  </div>
    }
    // playerTwo
    if(false == this.state.playerTwoConfirm && false == this.state.playerTwoResult) {
      playerTwo =  <div className="battle-input-container">
                    <div className="input-player">
                      <p className="input-title">Player Two:</p>
                      <input
                        type="text"
                        className="input-content"
                        placeholder="github username"
                        onChange={(event) => {
                          this.setState({
                            playerTwoName: event.target.value
                          });
                        }}/>
                      <button
                        disabled={this.state.playerTwoName.length == 0 ? 'disabled' : ''}
                        className={this.state.playerTwoName.length == 0 ? 'battle-submit-disable input-submit' : "input-submit"}
                        onClick={() => {
                          this.handleConfirm(2);
                        }}>
                        submit
                      </button>
                    </div>
                  </div>
    }
    if(true == this.state.playerTwoConfirm && false == this.state.playerTwoResult) {
      playerTwo = <div className="confirm-player">
                    <PlayerBattleConfirm data={this.state.playerTwoInfo}/>
                    <button className="reset-btn"
                      onClick={() => {
                        this.setState({
                          playerTwoConfirm: false
                        })
                      }}
                      >reset</button>
                  </div>
    }
    if(false == this.state.playerTwoConfirm && true == this.state.playerTwoResult) {
      playerTwo = <div className="battle-result-container">
                    <PlayerBattleResult
                      data={this.state.playerTwoInfo}
                      isWinner={this.state.battleResult == 2 ? true : false}
                      score={this.state.playerTwoScore}
                    />
                  </div>
    }


    return(
      <div>
        <div className="battle-container">
          <div className="player-container">
            {playerOne}
          </div>
          {this.state.playerOneConfirm &&  this.state.playerTwoConfirm ?
            <button
              className="battle-btn"
              onClick={() => {this.handleResult()}}>VS</button> :
            <div></div>}
          <div className="player-container">
            {playerTwo}
          </div>
        </div>
        {this.state.playerOneResult && this.state.playerTwoResult ?
          <button className="rebattle-btn"
            onClick={() => this.handleRebattle()}>Battle Again</button> :
            <div></div>
        }
      </div>
    )
  }
  // 处理用户confirm 事件
  handleConfirm(playerId) {
    let name = playerId === 1 ? this.state.playerOneName : this.state.playerTwoName;
    fetchData.getUserInfoByName(name)
    .then((data) => {
      let obj = {};
      if(playerId == 1) {
        obj['playerOneConfirm'] = true;
        obj['playerOneInfo'] = data;
      } else if(playerId == 2) {
        obj['playerTwoConfirm'] = true;
        obj['playerTwoInfo'] = data;
      }
      this.setState(obj);
    })
  }
  // 处理用户result事件
  handleResult() {
    let obj = {};
    obj['playerOneConfirm'] = false;
    obj['playerTwoConfirm'] = false;
    obj['playerOneResult'] = true;
    obj['playerTwoResult'] = true;
    obj['battleResult'] = this.calcResult().result;
    obj['playerOneScore'] = this.calcResult().playerOneScore;
    obj['playerTwoScore'] = this.calcResult().playerTwoScore;
    // 更新状态
    this.setState(obj);
  }
  // 处理用户重新比较事件
  handleRebattle() {
    // 恢复最初状态
    this.setState({
      // 第一阶段：输入
      playerOneName: '',
      playerTwoName: '',
      playerOneInfo: null,
      playerTwoInfo: null,
      // 第二阶段：确认
      playerOneConfirm: false,//控制player one显示确认界面
      playerTwoConfirm: false,//控制player two显示确认界面
      // 第三阶段：评比
      playerOneResult: false,// 控制player one显示结果界面
      playerTwoResult: false,// 控制player two显示结果界面
      playerOneScore: 0,
      playerTwoScore: 0,
      battleResult: 0,// 比较结果 1 一号玩家赢了 2 二号玩家赢了
    })
  }
  // 模拟计算结果
  calcResult() {
    let playerOneScore = parseInt(this.state.playerOneInfo.followers) * 2 + parseInt(this.state.playerOneInfo.public_repos) * 1
    let playerTwoScore = parseInt(this.state.playerTwoInfo.followers) * 2 + parseInt(this.state.playerTwoInfo.public_repos) * 1
    return {
      result: playerOneScore > playerTwoScore ? 1 : 2,
      playerOneScore,
      playerTwoScore
    };
  }

}
