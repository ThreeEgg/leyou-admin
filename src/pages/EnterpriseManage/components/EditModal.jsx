import React, { Component } from 'react'
import { Modal, Form, Input, Radio, message, } from 'antd';
import { addCompany, updateCompany, } from "@/services/company"

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
      this.addCompany(params);
    }
    console.log('params', params);
  }

  addCompany = async params => {
    const { success, msg } = await addCompany(params);
    if (success) {
      message.success('新增成功');
      this.handleCancel();
      this.props.reload();
    } else {
      message.error(msg)
    }
  }

  updateCompany = async params => {
    const { success, msg } = await updateCompany(params);
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
        <Form name="enterpriseForm" onFinish={this.onFinish} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} initialValues={editData}>
          <Form.Item label="企业名称" name="companyName"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <Input placeholder="请输入" maxLength={20} />
          </Form.Item>
          <Form.Item label="统一社会信用代码" name="creditCode"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <Input placeholder="请输入" maxLength={20} />
          </Form.Item>
          <Form.Item label="主营业务" name="mainBusiness"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <Input placeholder="请输入" maxLength={20} />
          </Form.Item>
          <Form.Item label="一般纳税人" name="isGeneralTaxpayer"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <Radio.Group >
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="有进出口业务" name="isExportAndImport"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <Radio.Group >
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="高新技术产业" name="isHighNewTech"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <Radio.Group >
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="其他" name="remark"
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