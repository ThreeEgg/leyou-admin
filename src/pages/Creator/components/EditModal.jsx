import React, { Component, createRef } from 'react'
import { Modal, Form, Input, message, } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import 'braft-editor/dist/index.css'
import 'braft-editor/dist/output.css'
import BraftEditor from 'braft-editor'
import classnames from 'classnames'
import { fileUpload, addLink, updateLink, } from '@/services/creator'

import PreviewContent from './PreviewContent'
import styles from "./EditModal.less"

class EditModal extends Component {

  state = {
    visible: false,
    editorValue: BraftEditor.createEditorState(""),

  }

  creatorFormRef = createRef()
  PreviewContentRef = createRef()

  extendControls = [
    'separator',
    {
      key: 'my-button',
      type: 'button',
      title: '预览', // 指定鼠标悬停提示文案
      className: 'my-modal', // 指定触发按钮的样式名
      html: null, // 指定在按钮中渲染的html字符串
      text: '预览', // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
      onClick: () => {
        let content = this.creatorFormRef.current.getFieldValue('content');
        if (content.toHTML) {
          content = content.toHTML();
        }
        this.setState({
          showContent: content,
        }, () => {
          this.PreviewContentRef.current.handleOk();
        })
      },
    }
  ]

  controls = [
    'undo', 'redo', 'separator',
    'font-size', 'line-height', 'letter-spacing', 'separator',
    'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
    'emoji', 'separator', 'text-indent', 'text-align', 'separator',
    'list-ul', 'list-ol', 'separator',
    'link', 'separator', 'hr', 'separator',
    'media',
    'separator',
    'clear'
  ] //'superscript', 'subscript', 'remove-styles', 'headings', 'blockquote','code',

  componentDidUpdate(prevProps) {
    if (prevProps.editData !== this.props.editData) {
      this.setState({
        editorValue: BraftEditor.createEditorState(unescape(unescape(this.props.editData.content || ''))),
      })
    }
  }

  renderModal = () => {
    console.log('点击')
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
    const params = paramsData;
    if (params.content.toHTML) {
      params.content = params.content.toHTML();
    }
    const { editData } = this.props;
    if (editData.id) {
      params.id = editData.id;
      this.updateLink(params)
    } else {
      this.addLink(params)
    }
  }

  addLink = async params => {
    const { success, msg } = await addLink(params);
    if (success) {
      message.success('新增成功');
      this.handleCancel();
      this.props.reload();
    } else {
      message.error(msg)
    }
  }

  updateLink = async params => {
    const { success, msg } = await updateLink(params);
    if (success) {
      message.success('修改成功');
      this.handleCancel();
      this.props.reload();
    } else {
      message.error(msg)
    }
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
    const { editData } = this.props;
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
        className={styles.creatorModal}
      >
        <Form name="creatorForm" onFinish={this.onFinish}
          labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
          ref={this.creatorFormRef}
          initialValues={editData}
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
            <BraftEditor defaultValue={editorValue}
              // onChange={this.handleChange}
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
        <PreviewContent ref={this.PreviewContentRef} showContent={showContent}></PreviewContent>
      </Modal>
    )
  }

}

export default EditModal
