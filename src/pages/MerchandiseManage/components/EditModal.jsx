import React, { Component } from 'react'
import { Modal, Form, Input, Radio, message, InputNumber, } from 'antd';
import { addClassify, updateClassify, getFirstClassifyList, } from "@/services/classify"


class EditModal extends Component {

  state = {
    visible: false,
    firstClassifyList: [],
  }

  componentDidMount() {
    this.getFirstClassifyList()
  }

  getFirstClassifyList = async () => {
    const { success, msg, data, } = await getFirstClassifyList();
    if (success) {
      this.setState({
        firstClassifyList: data
      })
    } else {
      message.error(msg)
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
    const { editData } = this.props;
    const { firstClassifyList } = this.state;
    const params = paramsData;
    if (editData.id) {
      params.id = editData.id;
      params.sort = editData.sort;
      this.updateClassify(params);
    } else {

      params.parentId = firstClassifyList.find(item => item.isService === params.isService).id;
      params.sort = 0;
      params.isSale = 1;
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
    const { visible, } = this.state;
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
              <Radio value={0}>实物产品</Radio>
              <Radio value={1}>服务产品</Radio>
            </Radio.Group>
          </Form.Item>
          {/* <Form.Item label="排序" name="sort"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <InputNumber placeholder="请输入" precision={0} min={-999} max={999} />
          </Form.Item> */}
        </Form>
      </Modal>
    )
  }

}

export default EditModal
