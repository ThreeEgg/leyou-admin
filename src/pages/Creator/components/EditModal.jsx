import React, { Component } from 'react'
import { Modal, Form, Input, Upload, Button, } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
// import BraftEditor from '@/components/BraftEditor'
import 'braft-editor/dist/index.css'
import 'braft-editor/dist/output.css'
import BraftEditor from 'braft-editor'
import classnames from 'classnames'

import styles from "./EditModal.less"

class EditModal extends Component {

  state = {
    visible: false,
    editorValue: BraftEditor.createEditorState(null),

  }

  extendControls = [
    'separator',
    {
      key: 'antd-uploader',
      type: 'component',
      component: (
        <Upload
          // accept="image/*"
          showUploadList={false}
          beforeUpload={this.beforeUpload}
        >
          <span type="primary" size="small" className={classnames("control-item button", styles.center)} data-title="上传"><UploadOutlined /></span>
        </Upload>
      )
    }
  ]

  controls = [
    'undo', 'redo', 'separator',
    'font-size', 'line-height', 'letter-spacing', 'separator',
    'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
    'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
    'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
    'link', 'separator', 'hr', 'separator',
    // 'media',
    'separator',
    'clear'
  ]

  uploadFn = (a, b, c, d) => {
    console.log(a, b, c, d)
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

  onFinish = params => {
    console.log('params', params)
  }

  handleChange = (editorValue) => {
    this.setState({ editorValue })
  }

  render() {
    const { extendControls, controls, } = this;
    const { visible, editorValue, } = this.state;
    return (
      <Modal
        title="新增"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okButtonProps={{
          htmlType: 'submit',
          form: 'creatorForm'
        }}
        destroyOnClose
      >
        <Form name="creatorForm" onFinish={this.onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item label="名称" name="name"
            rules={[
              { required: true, message: '请输入名称' }
            ]}
          >
            <Input maxLength={24} placeholder="请输入名称" />
          </Form.Item>
          <Form.Item>
            <BraftEditor value={editorValue}
              onChange={this.handleChange}
              extendControls={extendControls}
              controls={controls}
            />
          </Form.Item>
        </Form>
      </Modal>
    )
  }

}

export default EditModal