import React, { Component, createRef } from 'react'
import { Modal, Form, Input, message, InputNumber, Select, } from 'antd';
import { getClientList } from '@/services/client'
import { getClassifyList } from '@/services/classify'
import { getGoodList, getGoodDetail, } from '@/services/merchandise'

const { Option } = Select;
class AddOrder extends Component {

  state = {
    visible: false,
    clientList: [],
    classifyList: [],
    currentGoodId: null,
    goodList: [],
    goodsDetails: [],
  }

  orderFormRef = createRef();

  componentDidMount() {
    this.getClientList();
    this.getClassifyList();
  }

  getGoodList = async () => {
    const { currentGoodId } = this.state;
    const params = {
      type: currentGoodId
    }
    const { data, success } = await getGoodList(params);
    if (success) {
      this.setState({
        goodList: data
      })
    }
  }
  getGoodDetail = async (id) => {
    const { success, data } = await getGoodDetail({ id });
    if (success) {
      this.setState({
        goodsDetails: data.goodsDetails
      })
    } else {
      message.error('获取商品详情失败')
    }
  }

  getClassifyList = async () => {

    const params = {}
    const { data, success } = await getClassifyList(params);
    if (success) {
      this.setState({
        classifyList: data.filter(item => item.isService === 1),
      })
    }
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

  calculateCount = () => {
    // totalPrice
    const { current } = this.orderFormRef;
    const price = current.getFieldValue('price');
    const count = current.getFieldValue('count');

    if (price && count) {
      current.setFieldsValue({
        totalPrice: price * count,
      })
    }

  }

  render() {
    const { visible, clientList, classifyList, goodList, goodsDetails,
    } = this.state;

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
        <Form name="orderForm" onFinish={this.onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} ref={this.orderFormRef}>
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
          <Form.Item label="商品分类" name="classify"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <Select placeholder="请选择" onChange={value => {
              this.setState({ currentGoodId: value }, () => {
                this.getGoodList();
              })
            }}>
              {
                classifyList.map(classify => (
                  <Option key={classify.id} value={classify.id}>{classify.typeName}</Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item label="商品名称" name="goodId"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <Select placeholder="请先选择商品分类" onChange={value => this.getGoodDetail(value)}>
              {
                goodList.map(good => (
                  <Option key={good.id} value={good.id}>{good.goodsName}</Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item label="商品名称" name="price"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <Select placeholder="请先选择商品" onChange={this.calculateCount}>
              {
                goodsDetails.map(good => (
                  <Option key={good.id} value={good.price}>{good.detailName}</Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item label="商品数量" name="count"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <InputNumber placeholder="请输入" max={9999} min={1} precision={0} onChange={this.calculateCount} />
          </Form.Item>
          <Form.Item label="订单总额" name="totalPrice"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <Input disabled style={{ color: 'rgb(51,51,51)' }} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }

}

export default AddOrder
