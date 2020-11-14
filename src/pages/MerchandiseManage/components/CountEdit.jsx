import React, { Component } from 'react'
import { Modal, Form, InputNumber, message, } from 'antd';
import { countEdit, } from "@/services/merchandise"

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
    params.id = editData.id;
    this.countEdit(params)
    console.log('params', params);
  }



  countEdit = async params => {
    const { success, msg } = await countEdit(params);
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
        title="修改"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okButtonProps={{
          htmlType: 'submit',
          form: 'countEditForm'
        }}
        destroyOnClose
        maskClosable={false}
      >
        <Form name="countEditForm" onFinish={this.onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} initialValues={editData}>
          <Form.Item label="销售数量" name="salesCount"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <InputNumber placeholder="请输入" min={0} max={999999} precision={0} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }

}

export default EditModal