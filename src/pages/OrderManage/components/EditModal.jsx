import React, { Component } from 'react'
import { Modal, Form, Input, DatePicker, message, InputNumber, } from 'antd';
import { addClassify, } from "@/services/classify"

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

  onFinish = paramsData => {
    const { editData } = this.props;
    const params = paramsData;
    /* if (editData.id) {
      params.id = editData.id;
      this.updateClassify(params);
    } else {
      this.addClassify(params);
    } */
    console.log('params', params);
  }

  addClassify = async params => {
    const { success, msg } = await addClassify(params);
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
    const { editData } = this.props;
    return (
      <Modal
        title="提交信息"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okButtonProps={{
          htmlType: 'submit',
          form: 'orderForm'
        }}
        destroyOnClose
      >
        <Form name="orderForm" onFinish={this.onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} initialValues={editData}>
          <Form.Item label="快递公司" name="typeName1"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <Input placeholder="请输入" maxLength={20} />
          </Form.Item>
          <Form.Item label="快递单号" name="typeName2"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <Input placeholder="请输入" maxLength={20} />
          </Form.Item>
          <Form.Item label="服务到期时间" name="typeName3"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item label="订单金额" name="typeName4"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <InputNumber precision={2} min={0} max={9999999} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }

}

export default EditModal