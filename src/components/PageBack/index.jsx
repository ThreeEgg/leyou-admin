import React, { Component } from 'react';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {history} from 'umi';

class PageBack extends Component {

  state = {

  }

  pageBack = ()=>{
    history.goBack();
  }

  render(){
    const {title=""} = this.props;
    return (
      <span onClick={this.pageBack} style={{cursor:'pointer'}}>
        <ArrowLeftOutlined style={{marginRight:12}}/>{title}
      </span>
    )
  }

}


export default PageBack