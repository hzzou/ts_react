import React from 'react';
import { Spin, Icon } from 'antd';
import './Loading.styl';


class Loading extends React.Component{
 
  render(){
    const icon = <Icon type='loading' style={{fontSize:50}} />

    return (
      <div className="loading">
        <Spin indicator={icon} />
      </div>
    )
  }
}

export default Loading;