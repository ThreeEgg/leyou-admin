import React, { Component } from 'react'
import { Modal, Form, Input, Select, InputNumber, } from 'antd';

const { Option } = Select;
class FundEditModal extends Component {

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
          form: 'clientForm'
        }}
        destroyOnClose
      >
        <Form name="clientForm" onFinish={this.onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item label="额度" name="xxx" rules={[{ required: true, message: '请填写' }]}>
            <InputNumber min={-999999} max={999999} precision={0} />
          </Form.Item>
          <Form.Item label="备注" name="name4"
          // rules={[
          //   { required: true, message: '请输入' }
          // ]}
          >
            <Input placeholder="请输入" maxLength={100} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }

}

export default FundEditModal