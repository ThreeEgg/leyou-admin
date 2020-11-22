import React, { Component } from 'react'
import { Modal, Form, InputNumber, message, } from 'antd';
import { updateReport, } from "@/services/company"

class ReportEdit extends Component {

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
    params.id = editData.id
    this.updateReport(params)
    console.log('params', params);
  }


  updateReport = async params => {
    const { success, msg } = await updateReport(params);
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
          form: 'reportForm'
        }}
        destroyOnClose
      >
        <Form name="reportForm" onFinish={this.onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} initialValues={editData}>
          <Form.Item label="营业收入" name="businessIncomeYear"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <InputNumber placeholder="请输入" precision={2} min={0} max={9999999999} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="净利润" name="netProfitYear"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <InputNumber placeholder="请输入" precision={2} min={0} max={9999999999} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="总资产" name="totalAssets"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <InputNumber placeholder="请输入" precision={2} min={0} max={9999999999} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="净资产" name="netAssets"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <InputNumber placeholder="请输入" precision={2} min={0} max={9999999999} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }

}

export default ReportEdit
