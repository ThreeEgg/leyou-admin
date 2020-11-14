import React, { Component } from 'react'
import { Modal, Form, Input, DatePicker, message, InputNumber, } from 'antd';
import { updateExpressInfo, updateServiceTime, updateTotalPrice, } from "@/services/order"
import moment from "@/utils/moment"

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
    const { editData, flag } = this.props;
    const params = paramsData;
    params.id = editData.id;
    if (flag === 1) {
      this.updateExpressInfo(params);
    } else if (flag === 2) {
      params.serviceTerm = moment(params.serviceTerm).format("YYYY-MM-DD HH:mm:ss")
      this.updateServiceTime(params);
    } else if (flag === 3) {
      params.price = params.totalPrice;
      delete params.totalPrice;
      this.updateTotalPrice(params);
    }
    console.log('params', params);
  }

  updateTotalPrice = async params => {
    const { success, msg } = await updateTotalPrice(params);
    if (success) {
      message.success('更新成功');
      this.handleCancel();
      this.props.reload();
    } else {
      message.error(msg)
    }
  }

  updateServiceTime = async params => {
    const { success, msg } = await updateServiceTime(params);
    if (success) {
      message.success('更新成功');
      this.handleCancel();
      this.props.reload();
    } else {
      message.error(msg)
    }
  }

  updateExpressInfo = async params => {
    const { success, msg } = await updateExpressInfo(params);
    if (success) {
      message.success('更新成功');
      this.handleCancel();
      this.props.reload();
    } else {
      message.error(msg)
    }
  }

  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  render() {
    const { visible } = this.state;
    const { editData, flag, } = this.props;
    if (flag === 2 && editData.serviceTerm) {
      editData.serviceTerm = moment(editData.serviceTerm)
    }
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
          {
            flag === 1 && <>
              <Form.Item label="快递公司" name="courierCompany"
                rules={[
                  { required: true, message: '请输入' }
                ]}
              >
                <Input placeholder="请输入" maxLength={20} />
              </Form.Item>
              <Form.Item label="快递单号" name="courierNumber"
                rules={[
                  { required: true, message: '请输入' }
                ]}
              >
                <Input placeholder="请输入" maxLength={20} />
              </Form.Item>
            </>
          }
          {
            flag === 2 && <Form.Item label="服务到期时间" name="serviceTerm"
              rules={[
                { required: true, message: '请选择' }
              ]}
            >
              <DatePicker disabledDate={this.disabledDate} />
            </Form.Item>
          }
          {
            flag === 3 && <Form.Item label="订单金额" name="totalPrice"
              rules={[
                { required: true, message: '请选择' }
              ]}
            >
              <InputNumber precision={2} min={0} max={9999999} />
            </Form.Item>
          }

        </Form>
      </Modal>
    )
  }

}

export default EditModal