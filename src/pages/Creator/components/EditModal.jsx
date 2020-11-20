import React, { Component, createRef } from 'react'
import { Modal, Form, Input, } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import 'braft-editor/dist/index.css'
import 'braft-editor/dist/output.css'
import BraftEditor from 'braft-editor'
import classnames from 'classnames'
import { fileUpload } from '@/services/creator'

import PreviewContent from './PreviewContent'
import styles from "./EditModal.less"

class EditModal extends Component {

  state = {
    visible: false,
    editorValue: BraftEditor.createEditorState(null),

  }

  creatorFormRef = createRef()


  extendControls = [
    'separator',
    {
      key: 'my-modal',
      type: 'modal',
      title: '预览', // 指定鼠标悬停提示文案
      className: 'my-modal', // 指定触发按钮的样式名
      html: null, // 指定在按钮中渲染的html字符串
      text: '预览', // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
      onClick: () => {
      }, // 指定触发按钮点击后的回调函数
      modal: {
        id: 'preview-modal', // 必选属性，传入一个唯一字符串即可
        title: '预览', // 指定弹窗组件的顶部标题
        className: 'preview-modal', // 指定弹窗组件样式名
        width: 375, // 指定弹窗组件的宽度
        height: 667, // 指定弹窗组件的高度
        showFooter: false, // 指定是否显示弹窗组件底栏
        showClose: true, // 指定是否显示右上角关闭按钮
        closeOnBlur: true, // 指定是否在点击蒙层后关闭弹窗(v2.1.24)
        children: <PreviewContent isShow={true} />, // 指定弹窗组件的内容组件
      }
    }
  ]

  controls = [
    'undo', 'redo', 'separator',
    'font-size', 'line-height', 'letter-spacing', 'separator',
    'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
    'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
    'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
    'link', 'separator', 'hr', 'separator',
    'media',
    'separator',
    'clear'
  ]

  renderModal = () => {
    console.log('点击')
    return (
      <div>222</div>
    )
  }

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
    if (params.content.toHTML) {
      params.content = params.content.toHTML();
    }
    console.log('params', params)
  }

  handleChange = (editorValue) => {
    const form = this.creatorFormRef.current;
    const showContent = form.getFieldValue('content');

    this.setState({ editorValue, showContent })
  }

  validateFn = file => {
    if (file.size >= 1024 * 1024 * 2) {
      message.info('添加的资源不可以大于2M');
    }
    return file.size < 1024 * 1024 * 2;
  };

  myUploadFn = async param => {
    const successFn = result => {
      param.success({
        url: result.link,
        meta: {
          id: result.id,
          // title: result.oldFileName,
          // alt: result.oldFileName,
          // loop: false, // 指定音视频是否循环播放
          // autoPlay: false, // 指定音视频是否自动播放
          // controls: true, // 指定音视频是否显示控制栏
        },
      });
    };

    const progressFn = event => {
      // 上传进度发生变化时调用param.progress
      param.progress((event.loaded / event.total) * 100);
    };

    const errorFn = response => {
      // 上传发生错误时调用param.error
      param.error({
        msg: '上传失败',
      });
    };

    const result = await fileUpload({ file: param.file });
    if (result.success) {
      successFn(result.data);
    } else {
      errorFn(result);
    }
  };

  render() {
    const { extendControls, controls, } = this;
    const { visible, editorValue, showContent, } = this.state;
    console.log('editorValue', editorValue)
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
        maskClosable={false}
      >
        <Form name="creatorForm" onFinish={this.onFinish}
          labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
          ref={this.creatorFormRef}
        >
          <Form.Item label="名称" name="name"
            rules={[
              { required: true, message: '请输入名称' }
            ]}
          >
            <Input maxLength={24} placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="富文本" name="content"
            rules={[
              { required: true, message: '请输入内容' }
            ]}
          >
            <BraftEditor value={editorValue}
              onChange={this.handleChange}
              extendControls={extendControls}
              controls={controls}
              media={{
                uploadFn: this.myUploadFn,
                validateFn: this.validateFn,
                accepts: {
                  image: '.jpeg,.png,.jpg',
                  video: false,
                  audio: false,
                },
                externals: false
              }}
            />
          </Form.Item>
        </Form>
        <PreviewContent isShow={false} showContent={showContent}></PreviewContent>
      </Modal>
    )
  }

}

export default EditModal
