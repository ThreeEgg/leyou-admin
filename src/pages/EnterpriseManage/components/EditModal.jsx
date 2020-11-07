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
        width="40%"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okButtonProps={{
          htmlType: 'submit',
          form: 'enterpriseForm'
        }}
        destroyOnClose
        maskClosable={false}
      >
        <Form name="enterpriseForm" onFinish={this.onFinish} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Form.Item label="公司名称" name="name1"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <Input placeholder="请输入" maxLength={20} />
          </Form.Item>
          <Form.Item label="统一社会信用代码" name="name2"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <Input placeholder="请输入" maxLength={20} />
          </Form.Item>
          <Form.Item label="主营业务" name="name3"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <Input placeholder="请输入" maxLength={20} />
          </Form.Item>
          <Form.Item label="一般纳税人" name="x1"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <Radio.Group >
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="有进出口业务" name="x2"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <Radio.Group >
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="高新技术产业" name="x3"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <Radio.Group >
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="其他" name="name1"
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