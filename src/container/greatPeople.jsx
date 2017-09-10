import React from 'react';

import GreatPeopleItem from '../component/greatPeopleItem';

import * as fetchData from '../util/fetchData';

require('../style/greatPeople.less');


export default class GreatPeople extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalCount: 0,
      peopleArr: []
    };
  }
  componentDidMount() {
    fetchData.getGreatPeopleList(this.state.currentPage)
    .then((data) => {
      let obj = {};
      obj['totalCount'] = data['total_count'];
      obj['peopleArr'] = [...this.state.peopleArr, ...data['items']]
      this.setState(obj);
    });
  }
  render() {
    let list = null;
    list = this.state.peopleArr.map((item, index) => {
      return <GreatPeopleItem key={index} data={{people: item, index}}/>
    })
    return(
      <div>
        <div className="greatPeople-container">
          {list}
        </div>
        <div className="loadmore-container">
          <button
            disabled={this.state.currentPage <= Math.ceil(this.state.totalCount/30) ? '' : 'disabled'}
            className="loadmore-btn"
            onClick={() => {
            this.loadMore();
          }}>{this.state.currentPage < Math.ceil(this.state.totalCount/30) ? 'Load more' : 'All jobs done'}</button>
          <span className="totalCount">{`Total count(stars > 1000): ${this.state.totalCount == 0 ? '' : this.state.totalCount}`}</span>
        </div>
      </div>
    )
  }
  // 加载更多
  loadMore() {
    fetchData.getGreatPeopleList(this.state.currentPage+1)
    .then((data) => {
      let obj = {};
      obj['currentPage'] = this.state.currentPage+1;
      obj['peopleArr'] = [...this.state.peopleArr, ...data['items']]
      this.setState(obj);
    });
  }

}
