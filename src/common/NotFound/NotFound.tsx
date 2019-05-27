import React from 'react';
import {Link} from 'react-router-dom';
import './NotFound.styl';

const img_404 = require('../../assets/img/404.png');

class NotFound extends React.Component{

  render(){
    return(
      <div className="not-found">
        <img src={img_404} alt="img_404"/>
        <span>抱歉,页面出错了!你访问的页面已经离开地球</span>
        <Link to={'/'}>返回首页</Link>
      </div>      
    )
  }
}

export default NotFound;