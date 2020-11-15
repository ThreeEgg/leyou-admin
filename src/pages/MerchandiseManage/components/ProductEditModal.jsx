import React, { Component } from 'react'
import {
  Modal, Form, Input, Radio, Upload, Button, Space, message,
  InputNumber, Row, Col,
} from 'antd';
import { LoadingOutlined, PlusOutlined, MinusCircleOutlined, UploadOutlined, } from '@ant-design/icons';
import { addGood, updateGood, } from '@/services/merchandise'

import styles from "./ProduceEditModal.less"
//1325402507109228546
const { TextArea } = Input;
class ProduceEditModal extends Component {

  state = {
    visible: false,
    loading: false,
    cover: '',
    coverLink: "",
    bannerFileList: [
      // {
      //   uid: '1',
      //   name: 'image.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
      // {
      //   uid: '2',
      //   name: 'image.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
    ],
    detailFileList: [],
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    activityRadio: 0,
    agreementId: "",
    agreementLink: "",
    agreementName: '',
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
    if (prevProps.editData !== this.props.editData) {
      const { editData } = this.props;
      this.setState({
        activityRadio: editData.isActivity
      })
    }
  }

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


  handleModalCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleBannerChange = ({ file, fileList }) => {

    if (file.status === 'done' || file.status === 'removed') {
      this.setState({ bannerFileList: fileList })
    }
    console.log('handleBannerChange', file, fileList)
  };

  handleDetailChange = ({ file, fileList }) => {

    if (file.status === 'done' || file.status === 'removed') {
      this.setState({ detailFileList: fileList })
    }
    console.log('handleDetailChange', file, fileList)
  };

  itemRender = (defaultRender, item) => {
    return (

      <div className={styles.uploader} key={item.uid}>
        {defaultRender}
        <Upload
          name="file"
          action="/v1/upload/uploadFile"
          data={{
            type: 2,
          }}
          onChange={(info) => this.handleItemChange(info, item.uid)}
          beforeUpload={this.beforeItemUpload}
        >
          <PlusOutlined style={{ fontSize: 18 }} />
        </Upload>
      </div>
    )
  }

  detailItemRender = (defaultRender, item) => {
    return (

      <div className={styles.uploader} key={item.uid}>
        {defaultRender}
        <Upload
          name="file"
          action="/v1/upload/uploadFile"
          data={{
            type: 3,
          }}
          onChange={(info) => this.handleDetailItemChange(info, item.uid)}
          beforeUpload={this.beforeItemUpload}
        >
          <PlusOutlined style={{ fontSize: 18 }} />
        </Upload>
      </div>
    )
  }

  beforeItemUpload = (file, fileList) => {
    if (fileList.filter(item => item.status === 'done').length === 1) {
      message.info('最多上传10张')

    }
  }

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

  handleItemChange = (info, uid) => {
    console.log('handleItemChange', info, uid)
    if (info.file.status === 'done') {
      const { bannerFileList } = this.state;
      bannerFileList.splice(bannerFileList.findIndex(file => file.uid === uid) + 1, 0, info.file);
      this.setState({ bannerFileList })
    }

  }

  handleDetailItemChange = (info, uid) => {
    console.log('handleItemChange', info, uid)
    if (info.file.status === 'done') {
      const { detailFileList } = this.state;
      detailFileList.splice(detailFileList.findIndex(file => file.uid === uid) + 1, 0, info.file);
      this.setState({ detailFileList })
    }

  }

  onRemove = (fileList) => {
    /* if (fileList.filter(item => item.status === 'done').length === 1) {
      message.info('最后一个禁止删除')
      return false;
    } */
    return true;
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
    console.log('params', params);
    const { editData } = this.props;
    const { cover, coverLink, agreementId, agreementLink, bannerFileList, detailFileList, } = this.state;
    params.agreementId = agreementId;
    params.agreementLink = agreementLink;
    params.cover = cover;
    params.coverLink = coverLink;
    params.bannerFileList = bannerFileList;
    params.detailFileList = detailFileList;
    this.addGood(params)
  }

  addGood = async params => {
    const { success, msg } = await addGood(params);
    if (success) {
      message.success('新增成功');
      this.handleCancel();
      this.props.reload();
    } else {
      message.error(msg)
    }
  }

  updateGood = async params => {
    const { success, msg } = await updateGood(params);
    if (success) {
      message.success('修改成功');
      this.handleCancel();
      this.props.reload();
    } else {
      message.error(msg)
    }
  }

  handleChange = ({ bannerFileList }) => this.setState({ bannerFileList });

  handleCoverChange = ({ file }) => {
    if (file.status === 'done') {
      const { response: { success, data } } = file;
      if (success) {
        this.setState({
          cover: data.id,
          coverLink: data.link
        })
      } else {
        this.setState({
          cover: '',
          coverLink: ''
        })
        message.error('图片上传失败')
      }
    }
    console.log(file);
  }

  handleContractChange = ({ file }) => {
    if (file.status === 'done') {
      const { response: { success, data } } = file;
      if (success) {
        this.setState({
          agreementId: data.id,
          agreementLink: data.link,
          agreementName: file.name
        })
      } else {
        this.setState({
          agreementId: '',
          agreementLink: '',
          agreementName: '',
        })
        message.error('文件上传失败')
      }
    }
    console.log('handleContractChange', file);
  }

  render() {
    const {
      visible, loading, coverLink, bannerFileList, detailFileList,
      previewVisible, previewImage, previewTitle, activityRadio, agreementLink,
      agreementName,
    } = this.state;
    const { editData, classifyList, } = this.props;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    console.log('coverLink', coverLink, agreementLink,)
    console.log('fileList', bannerFileList, detailFileList)
    return (
      <Modal
        title={editData.id ? '编辑' : '新增' + '商品'}
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
        <Form name="productForm" onFinish={this.onFinish} labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} initialValues={editData}>
          <Form.Item label="名称" name="goodsName"
            rules={[
              { required: true, message: '请输入' }
            ]}
          >
            <Input placeholder="请输入名称" maxLength={20} />
          </Form.Item>
          <Form.Item label="分类" name="type"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <Radio.Group >
              {
                classifyList.map(item => (
                  <Radio key={item.id} value={item.id}>{item.typeName}</Radio>
                ))
              }
            </Radio.Group>
          </Form.Item>
          <Form.Item label="封面图" name="cover"
            rules={[
              { required: true, message: '请上传' }
            ]}
          >
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/v1/upload/uploadFile"
              data={{
                type: 1,
              }}
              beforeUpload={(file) => this.beforeUpload(file, 2, ['image/jpeg', 'image/png'])}
              onChange={this.handleCoverChange}
            >
              {coverLink ? <img src={coverLink} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item label="轮播图" name="bannerList"
            rules={[
              { required: true, message: '请上传' }
            ]}
          >
            <Upload
              action="/v1/upload/uploadFile"
              data={{
                type: 2,
              }}
              listType="picture-card"
              fileList={bannerFileList.filter(item => item.status === 'done' || item.status === 'uploading')}
              beforeUpload={(file) => this.beforeUpload(file, 2, ['image/jpeg', 'image/png'])}
              onPreview={this.handlePreview}
              onChange={this.handleBannerChange}
              itemRender={this.itemRender}
            // onRemove={() => this.onRemove(fileList)}
            >
              {bannerFileList.filter(item => item.status === 'done').length === 0 ? uploadButton : null}
            </Upload>
          </Form.Item>
          <Form.Item label="商品品类" >
            <Form.List name="goodsDetails" >
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
                          name={[field.name, 'detailName']}
                          fieldKey={[field.fieldKey, 'detailName']}
                          rules={[{ required: true, message: '请输入' }]}
                        >
                          <Input placeholder="请输入" />
                        </Form.Item>
                        <Form.Item
                          label="价格"
                          {...field}
                          name={[field.name, 'price']}
                          fieldKey={[field.fieldKey, 'price']}
                          rules={[{ required: true, message: '请输入' }]}
                        >
                          <InputNumber placeholder="请输入" precision={2} min={0} max={999999} />
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
          <Form.Item label="合同" name="agreementLink"
            rules={[
              { required: true, message: '请上传' }
            ]}
          >
            <Upload
              name="file"
              action="/v1/upload/uploadFile"
              data={{
                type: 4,
              }}
              showUploadList={false}
              onChange={this.handleContractChange}
              beforeUpload={(file) => this.beforeUpload(file, 2, ['application/pdf'])}
            >
              {
                agreementLink ? <Button><UploadOutlined />{agreementName}</Button> : <Button><UploadOutlined />点击上传</Button>
              }
            </Upload>
          </Form.Item>
          <Form.Item label="服务时间(月)" name="serviceTerm">
            <InputNumber precision={0} min={1} max={99} />
          </Form.Item>
          <Form.Item label="商品活动" name="isActivity"
            rules={[
              { required: true, message: '请选择' }
            ]}
          >
            <Radio.Group onChange={(e) => this.setState({ activityRadio: e.target.value })}>
              <Radio value={0}>不参加</Radio>
              <Radio value={1}>参加</Radio>
            </Radio.Group>
          </Form.Item>
          {
            activityRadio === 1 && <>
              <Form.Item label="执行时间(月)" name="executionTime" rules={[{ required: true, message: '请填写' }]}>
                <InputNumber precision={0} min={1} max={99} />
              </Form.Item>
              <Row style={{ paddingLeft: 36 }}>
                <Col span={5}>
                  <Form.Item label="返还簿记豆数" name="returnPoint" wrapperCol={{ span: 12 }} labelCol={{ span: 12 }}
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(rule, value, callback) {
                          if (!value && !getFieldValue('extraTime')) {
                            return callback('返还簿记豆数和延长服务时间必填其一');
                          }
                          if (value && getFieldValue('extraTime')) {
                            return callback('返还簿记豆数和延长服务时间二选一');
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
                  <Form.Item label="延长服务时间(月)" name="extraTime" wrapperCol={{ span: 16 }} labelCol={{ span: 8 }}
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(rule, value, callback) {
                          if (!value && !getFieldValue('returnPoint')) {
                            return callback('返还簿记豆数和延长服务时间必填其一');
                          }
                          if (value && getFieldValue('returnPoint')) {
                            return callback('返还簿记豆数和延长服务时间二选一');
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
            </>
          }

          <Form.Item label="商品详情文本" name="abstracts">
            <TextArea maxLength={1000} />
          </Form.Item>
          <Form.Item label="商品详情图片" name="detailList"
            rules={[
              { required: true, message: '请上传' }
            ]}
          >
            <Upload
              name="file"
              action="/v1/upload/uploadFile"
              data={{
                type: 3,
              }}
              fileList={detailFileList.filter(item => item.status === 'done' || item.status === 'uploading')}
              listType="picture-card"
              fileList={detailFileList}
              onPreview={this.handlePreview}
              itemRender={this.detailItemRender}
              onChange={this.handleDetailChange}
              beforeUpload={(file) => this.beforeUpload(file, 2, ['image/jpeg', 'image/png'])}
            >
              {detailFileList.filter(item => item.status === 'done').length === 0 ? uploadButton : null}
            </Upload>
          </Form.Item>
        </Form>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleModalCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Modal>
    )
  }

}

export default ProduceEditModal