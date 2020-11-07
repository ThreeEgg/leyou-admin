import React, { Component } from 'react'
import {
  Modal, Form, Input, Radio, Upload, Button, Space, message,
  InputNumber, Row, Col,
} from 'antd';
import { LoadingOutlined, PlusOutlined, MinusCircleOutlined, UploadOutlined, } from '@ant-design/icons';

import styles from "./ProduceEditModal.less"

const { TextArea } = Input;
class ProduceEditModal extends Component {

  state = {
    visible: false,
    loading: false,
    imageUrl: "",
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-xxx',
        percent: 50,
        name: 'image.png',
        status: 'uploading',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'error',
      },
    ],
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
    console.log('params', params);
  }

  handleChange = ({ fileList }) => this.setState({ fileList });


  render() {
    const { visible, loading, imageUrl, fileList, } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Modal
        title="新增"
        width="60%"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okButtonProps={{
          htmlType: 'submit',
          form: 'productForm'
        }}
        className={styles.ProduceEditModal}
        destroyOnClose
        maskClosable={false}
      >
        <Form name="productForm" onFinish={this.onFinish} labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
          <Form.Item label="名称" name="name"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <Input placeholder="请输入名称" maxLength={20} />
          </Form.Item>
          <Form.Item label="分类" name="x"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <Radio.Group >
              <Radio value={1}>分类1</Radio>
              <Radio value={2}>分类2</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="封面图" name="x1"
            rules={[
              { required: true, message: '请上传' }
            ]}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            // beforeUpload={beforeUpload}
            // onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item label="轮播图" name="x2"
            rules={[
              { required: true, message: '请上传' }
            ]}
          >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 10 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item label="商品品类" >
            <Form.List name="users" >
              {(fields, { add, remove }) => {
                setTimeout(() => {
                  if (fields.length === 0) {
                    add()
                  }
                })
                return (
                  <>
                    {fields.map(field => (
                      <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          label="品类名称"
                          {...field}
                          name={[field.name, 'first']}
                          fieldKey={[field.fieldKey, 'first']}
                          rules={[{ required: true, message: '请输入' }]}
                        >
                          <Input placeholder="请输入" />
                        </Form.Item>
                        <Form.Item
                          label="价格"
                          {...field}
                          name={[field.name, 'last']}
                          fieldKey={[field.fieldKey, 'last']}
                          rules={[{ required: true, message: '请输入' }]}
                        >
                          <Input placeholder="请输入" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => {
                          if (fields.length === 1) {
                            message.info('必填一项商品品类');
                            return;
                          }
                          remove(field.name)
                        }} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ width: 140 }}>
                        新增
                      </Button>
                    </Form.Item>
                  </>
                )
              }}
            </Form.List>
          </Form.Item>
          <Form.Item label="合同" name="he"
            rules={[
              { required: true, message: '请上传' }
            ]}
          >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              onChange={this.handleChange}
            >
              <Button><UploadOutlined />点击上传</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="服务时间(月)" name="month">
            <InputNumber precision={0} min={1} max={99} />
          </Form.Item>
          <Form.Item label="商品活动" name="x6"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <Radio.Group >
              <Radio value={1}>不参加</Radio>
              <Radio value={2}>参加</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="执行时间(月)" name="month1" rules={[{ required: true, message: '请填写' }]}>
            <InputNumber precision={0} min={1} max={99} />
          </Form.Item>
          <Row style={{ paddingLeft: 36 }}>
            <Col span={5}>
              <Form.Item label="返还簿记豆数" name="count1" wrapperCol={{ span: 12 }} labelCol={{ span: 12 }}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(rule, value, callback) {
                      if (!value && !getFieldValue('count2')) {
                        return callback('返还簿记豆数和延长服务时间必填其一');
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber precision={0} min={1} max={999999} />
              </Form.Item>
            </Col>
            <Col span={1} style={{ padding: 6 }}>或</Col>
            <Col span={8}>
              <Form.Item label="延长服务时间(月)" name="count2" wrapperCol={{ span: 16 }} labelCol={{ span: 8 }}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(rule, value, callback) {
                      if (!value && !getFieldValue('count1')) {
                        return callback('返还簿记豆数和延长服务时间必填其一');
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber precision={0} min={1} max={99} />
              </Form.Item>
            </Col>

          </Row>
          <Form.Item label="商品详情文本" name="x10">
            <TextArea maxLength={1000} />
          </Form.Item>
          <Form.Item label="商品详情图片" name="x22"
            rules={[
              { required: true, message: '请上传' }
            ]}
          >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 10 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    )
  }

}

export default ProduceEditModal