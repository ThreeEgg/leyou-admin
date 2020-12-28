import React, { Component } from 'react'
import { Modal, Form, Input, message, InputNumber, Select, } from 'antd';
import { getClientList } from '@/services/client'

const { Option } = Select;
class AddOrder extends Component {

  state = {
    visible: true,
    clientList: []
  }

  componentDidMount() {
    this.getClientList();
  }

  getClientList = async () => {
    const params = {
      pageSize: 200,
      currentPage: 1
    }

    const { data, success } = await getClientList(params);
    console.log('data', data);
    if (success) {
      this.setState({
        clientList: data.list
      })
    }
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




  render() {
    const { visible, clientList, } = this.state;

    return (
      <Modal
        title="新增订单"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okButtonProps={{
          htmlType: 'submit',
          form: 'orderForm'
        }}
        destroyOnClose
      >
        <Form name="orderForm" onFinish={this.onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} >
          <Form.Item label="客户" name="client"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <Select placeholder="请选择">
              {
                clientList.map(client => (
                  <Option key={client.id} value={client.id}>{client.realName}</Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item label="快递公司" name="courierCompany"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >

            <Input placeholder="请输入" maxLength={20} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }

}

export default AddOrder
