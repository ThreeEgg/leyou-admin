import React, { Component } from 'react'
import { Modal, Form, Input, InputNumber, message, } from 'antd';
import { addBeansRecord } from '@/services/client'

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

  onFinish = paramsData => {
    const params = paramsData;
    const { userId } = this.props;
    params.userId = userId;
    this.addBeansRecord(params)
    console.log('params', params);
  }

  addBeansRecord = async params => {
    const { success, msg } = await addBeansRecord(params);
    if (success) {
      message.success('新增成功');
      this.handleCancel();
      this.props.reload();
    } else {
      message.error(msg)
    }
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
          <Form.Item label="额度" name="point" rules={[{ required: true, message: '请填写' }]}>
            <InputNumber min={-999999} max={999999} precision={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="备注" name="remark"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <Input placeholder="请输入" maxLength={100} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }

}

export default FundEditModal