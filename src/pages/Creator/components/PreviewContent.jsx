import React, { Component } from 'react'

class PreviewContent extends Component {

  state = {

  }

  render() {
    const { isShow, showContent = '<span/>' } = this.props
    console.log('showContent', showContent);
    let html = showContent
    if (showContent.toHTML) {
      html = showContent.toHTML()
    }
    console.log('html', html)
    return (
      <div style={{ display: isShow ? 'block' : 'none' }}>
        {html}
      </div>
    )
  }
}

export default PreviewContent
