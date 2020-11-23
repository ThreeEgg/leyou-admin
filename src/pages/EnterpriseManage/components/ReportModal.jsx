import React, { Component } from 'react'
import { Modal, Upload, Form, Radio, Button, message, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const fileTypeList = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
class ReportModal extends Component {

  state = {
    visible: false,
    radioType: 0,
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

  beforeUpload = (file, size, fileType) => {
    console.log('file', file)
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isJpgOrPng = !!fileType.find(item => item === file.type);
    if (!isJpgOrPng) {
      message.error('文件格式不符');
    }
    const isLt2M = file.size / 1024 / 1024 < size;
    if (!isLt2M) {
      message.error(`文件大小限制${size}M`);
    }
    return isJpgOrPng && isLt2M;
  }

  handleChange = ({ file }) => {
    if (!this.hide) {
      this.hide = message.loading('上传中', 0)
    }

    if (file.status === 'done') {
      const { response: { success, } } = file;
      if (success) {
        this.hide();
        message.success('文件上传成功')
        this.props.reload()
      } else {
        this.hide();
        message.error('文件上传失败')
      }
    }
    if (file.status === 'error') {
      this.hide();
      message.error('文件上传失败')
    }
    console.log('file', file);
  }

  render() {
    const { visible, radioType } = this.state;
    const { reportId } = this.props;
    return (
      <Modal
        title="上传报表"
        visible={visible}
        footer={null}
        onCancel={this.handleCancel}
      >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} initialValues={{ radioType: 0 }}>
          <Form.Item name="radioType" label="模板类型">
            <Radio.Group value={radioType} onChange={e => this.setState({ radioType: e.target.value })} >
              <Radio value={0}>模板编号：000</Radio>
              <Radio value={1}>模板编号：001</Radio>
              <Radio value={2}>模板编号：002</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="报表" name="file">
            <Upload
              name="file"
              accept=".xls,.xlsx"
              action="/v1/upload/uploadExcel"
              data={{
                type: radioType,
                reportId: reportId,
              }}
              showUploadList={false}
              beforeUpload={(file) => this.beforeUpload(file, 4, fileTypeList)}
              onChange={this.handleChange}
            >
              <Button type="primary" icon={<UploadOutlined />}>上传</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default ReportModal
