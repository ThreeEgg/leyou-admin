import React, { Component } from 'react'
import { Modal, Form, Input, Select, message, } from 'antd';
import { addClient, updateClient, } from "@/services/client"
import { getAllCompanyList } from "@/services/company"
const { Option } = Select;
class EditModal extends Component {

  state = {
    visible: false,
    allCompanyList: [],
  }

  componentDidMount() {
    this.getAllCompanyList();
  }

  getAllCompanyList = async () => {
    const { success, data, msg } = await getAllCompanyList();
    if (success) {
      this.setState({
        allCompanyList: data
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
    const params = paramsData;
    params.companyIds = params.companyIds.join(',');
    if (editData.id) {
      params.id = editData.id;
      this.updateClient(params)
    } else {
      this.addClient(params)
    }
    console.log('params', params);
  }

  addClient = async params => {
    const { success, msg } = await addClient(params);
    if (success) {
      message.success('新增成功');
      this.handleCancel();
      this.props.reload();
    } else {
      message.error(msg)
    }
  }

  updateClient = async params => {
    const { success, msg } = await updateClient(params);
    if (success) {
      message.success('修改成功');
      this.handleCancel();
      this.props.reload();
    } else {
      message.error(msg)
    }
  }

  render() {
    const { visible, allCompanyList, } = this.state;
    const { editData } = this.props;
    return (
      <Modal
        title={editData.id ? "更新" : "新增"}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okButtonProps={{
          htmlType: 'submit',
          form: 'clientForm'
        }}
        destroyOnClose
      >
        <Form name="clientForm" onFinish={this.onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} initialValues={editData}>
          <Form.Item label="姓名" name="realName"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <Input placeholder="请输入" maxLength={20} />
          </Form.Item>

          <Form.Item label="电话" name="phone"
            rules={[
              { required: true, message: '请输入' },
              { pattern: /^1[3456789]\d{9}$/, message: '格式错误' }
            ]}
          >
            <Input placeholder="请输入" maxLength={20} />
          </Form.Item>
          <Form.Item label="可见企业" name="companyIds"
            rules={[
              { required: true, message: '请选择' },
            ]}
          >
            <Select mode="multiple">
              {
                allCompanyList.map(company => (
                  <Option key={company.id} value={company.id}>{company.companyName}</Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item label="身份证号" name="idCard"
            rules={[
              { pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确格式身份证号' },
            ]}
          >
            <Input placeholder="请输入" maxLength={18} />
          </Form.Item>
          <Form.Item label="其他" name="remark"
            rules={[
              // { required: true, message: '请输入' }
            ]}
          >
            <Input placeholder="请输入" maxLength={100} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }

}

export default EditModal
