import React, { Component } from 'react'
import { Modal, } from 'antd';

import styles from './PreviewContent.less'
class PreviewContent extends Component {

  state = {
    visible: false,
  }


  handleOk = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, } = this.state;
    const { showContent } = this.props;
    console.log('showContent modal', showContent)
    return (
      <Modal
        title="预览"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={null}
        destroyOnClose
      >
        <div className={styles.box}>
          <div className="display" dangerouslySetInnerHTML={{ __html: showContent }} />
        </div>
      </Modal>
    )
  }

}

export default PreviewContent
