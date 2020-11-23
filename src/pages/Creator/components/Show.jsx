import React, { Component } from 'react'
import { getParameter } from "@/utils/tools"
import { getLinkDetail } from "@/services/creator"
import { message } from "antd"

class Show extends Component {

  state = {
    id: getParameter('id'),
    content: null,
  }

  componentDidMount() {
    this.getLinkDetail()
  }

  getLinkDetail = async () => {
    const { id } = this.state
    const params = {
      id: id
    }
    const { data, success, msg } = await getLinkDetail(params);
    if (success) {
      document.title = data.name;
      this.setState({
        content: data.content,
      })
    } else {
      message.error(msg);
    }
  }


  render() {
    const { content } = this.state;
    console.log('content', content);
    return (
      <div dangerouslySetInnerHTML={{ __html: content }} />
    )
  }
}

export default Show
