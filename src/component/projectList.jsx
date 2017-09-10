import React from 'react';

import ProjectItem from './projectItem';

import * as fetchData from '../util/fetchData';

export default class ProjectList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentPage: 1,
      totalCount: 0,
      allFinish: false,
      language: ''
    }
  }
  componentDidMount() {
    let language = this.props.match.params.language;
    // 因为当前会话周期内，queryproject的排名基本不会发生什么变化
    if(!this.state[language]) {
      fetchData.getPopularProjectOfLanguage(language, this.state.currentPage)
      .then((data) => {
        let obj = {loading: false};
        obj['language'] = language;//语言
        obj[language] = [...data['items']];//数据
        obj['currentPage'] = this.state.currentPage+1;//当前页
        obj['totalCount'] = data['total_count'];// 总数
        this.setState(obj);
        // 注意别犯傻写成this.setState({language: data});
        // console.log(this.state);
      });
    }
  }
  render() {
    let com = null;
    if(this.state.loading) {
      com = <div className="screen-center">Loading</div>
    } else {
      let dataArr = this.state[this.props.match.params.language];
      if(!dataArr) {
        this.getData(this.props.match.params.language)
      } else {
        com = dataArr.map((item, index) => {
          return <ProjectItem key={index} data={{item, index}}/>
        })
      }
    }
    return(
      <div>
        <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
          {com}
        </div>
        {/* <div className="loadmore-container">
          <button className="loadmore-btn"
            disabled={this.state.allFinish ? 'disabled' : ''}
            onClick={() => {
            this.loadMore();
          }}>{this.state.allFinish ? 'All jobs done' : 'Load more'}</button>
          <span className="totalCount">{`Total count(stars > 1000): ${this.state.totalCount == 0 ? '' : this.state.totalCount}`}</span>
        </div> */}
      </div>
    )
  }
  // url changed
  getData(query) {
    return fetchData.getPopularProjectOfLanguage(query, this.state.currentPage+1)
    .then((data) => {
      let obj = {loading: false};
      obj[query] = data['items'];
      this.setState(obj);
      // 注意别犯傻写成this.setState({query: data});
    });
  }
  // 加载更多
  // loadMore() {
  //   if(!this.isFinish()){
  //     fetchData.getPopularProjectOfLanguage(this.state.queryString, this.state.currentPage+1)
  //     .then((data) => {
  //       let obj = {};
  //       obj['currentPage'] = this.state.currentPage+1;
  //       obj[this.state.language] = [...this.state[this.state.language], ...data['items']]
  //       this.setState(obj);
  //     });
  //   }
  // }
  // 判断是否完成
  isFinish() {
    if(this.state.currentPage > Math.ceil(this.state.totalCount/30)) {
      this.setState({allFinish: true});
      return true;
    }
    return false;
  }

}
