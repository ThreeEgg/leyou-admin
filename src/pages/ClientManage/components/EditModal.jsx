import React, { Component } from 'react'
import { Modal, Form, Input, Select, } from 'antd';

const { Option } = Select;
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
          form: 'clientForm'
        }}
        destroyOnClose
      >
        <Form name="clientForm" onFinish={this.onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item label="姓名" name="name1"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <Input placeholder="请输入" maxLength={20} />
          </Form.Item>

          <Form.Item label="电话" name="name2"
            rules={[
              { required: true, message: '请输入' },
              { pattern: /^1[3456789]d{9}$/, message: '格式错误' }
            ]}
          >
            <Input placeholder="请输入" maxLength={20} />
          </Form.Item>
          <Form.Item label="可见企业" name="name3"
            rules={[
              { required: true, message: '请选择' },
            ]}
          >
            <Select>
              <Option value={1}>zzzz</Option>
              <Option value={2}>xxx</Option>
            </Select>
          </Form.Item>
          <Form.Item label="其他" name="name4"
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

export default EditModal