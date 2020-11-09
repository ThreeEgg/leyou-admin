import React, { Component } from 'react'
import { Modal, Form, Input, Radio } from 'antd';
import { addClassify, updateClassify, } from "@/services/company"

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
    if (editData.id) {
      params.id = editData.id;
      this.updateCompany(params);
    } else {
      this.addClassify(params);
    }
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

  updateClassify = async params => {
    const { success, msg } = await updateClassify(params);
    if (success) {
      message.success('修改成功');
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
        title={editData.id ? "更新" : "新增"}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okButtonProps={{
          htmlType: 'submit',
          form: 'classifyForm'
        }}
        destroyOnClose
      >
        <Form name="classifyForm" onFinish={this.onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} initialValues={editData}>
          <Form.Item label="名称" name="typeName"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="类型" name="isService"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <Radio.Group >
              <Radio value={0}>实物商品</Radio>
              <Radio value={1}>服务商品</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    )
  }

}

export default EditModal