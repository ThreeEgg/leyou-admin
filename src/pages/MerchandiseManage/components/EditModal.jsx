import React, { Component } from 'react'
import { Modal, Form, Input, Radio } from 'antd';

class EditModal extends Component {

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

  onFinish = params => {
    console.log('params', params);
  }

  render() {
    const { visible } = this.state;
    return (
      <Modal
        title="新增"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okButtonProps={{
          htmlType: 'submit',
          form: 'classifyForm'
        }}
        destroyOnClose
      >
        <Form name="classifyForm" onFinish={this.onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item label="名称" name="name"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="类型" name="x"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <Radio.Group >
              <Radio value={1}>实物商品</Radio>
              <Radio value={2}>服务商品</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    )
  }

}

export default EditModal