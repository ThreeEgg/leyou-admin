import React, { Component } from 'react'
import { Modal, Form, Input, Radio, message, Select, } from 'antd';
import { addCompany, updateCompany, } from "@/services/company"

const typeArr = [
  { value: 'A', label: '农林牧渔|NL' }, { value: 'B', label: '采矿业|CK' },
  { value: 'C', label: '制造业|ZZ' }, { value: 'D', label: '电力、热力、燃气及水生产和供应业|DL' },
  { value: 'E', label: '建筑业|JZ' }, { value: 'F', label: '批发、商贸和零售业|PF' },
  { value: 'G', label: '交通运输、仓储和邮政业|JT' }, { value: 'H', label: '住宿和餐饮业|ZS' },
  { value: 'I', label: '信息传输、软件和信息技术服务业|XX' }, { value: 'J', label: '金融业|JR' },
  { value: 'K', label: '房地产业|FD' }, { value: 'L', label: '租赁和商务服务业|ZL' },
  { value: 'M', label: '科学研究和技术服务业|KX' }, { value: 'N', label: '水利、环境和公共设施管理业|SL' },
  { value: 'O', label: '卫生和社会工作|WS' }, { value: 'P', label: '教育|JY' },
  { value: 'Q', label: '科学研究和技术服务业|KX' }, { value: 'R', label: '文化、体育和娱乐业|WH' },
  { value: 'S', label: '公共管理、社会保障和社会组织|GG' }, { value: 'T', label: '其他|QT' }
]

const { Option } = Select;
const { TextArea } = Input;
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
          <Form.Item label="行业分类" name="type"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <Select>
              {
                typeArr.map(item => (
                  <Option key={item.value} value={item.value}>{item.label}</Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item label="商业模式描述" name="desc">
            <TextArea maxLength={1000} />
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
