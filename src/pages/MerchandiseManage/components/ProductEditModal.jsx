import React, { Component, createRef } from 'react'
import {
  Modal, Form, Input, Radio, Upload, Button, Space, message,
  InputNumber, Row, Col,
} from 'antd';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';

import { LoadingOutlined, PlusOutlined, MinusCircleOutlined, UploadOutlined, EyeOutlined, DeleteOutlined, } from '@ant-design/icons';
import { addGood, updateGood, } from '@/services/merchandise'
import { getStateByParams } from "@/utils/tools"
// import ImgCrop from 'antd-img-crop';
import styles from "./ProduceEditModal.less"
//1325402507109228546

import arrayMove from 'array-move';
const SortableContainer = sortableContainer((props) => <ul style={{ width: "100%", display: 'flex', 'flexWrap': 'wrap' }} {...props}>{props.children}</ul>);
const SortableItem = sortableElement((props) => <span style={{ width: 104, height: 104, margin: '0 5px 5px 0', pointerEvents: 'bounding-box' }} {...props}>{props.children}</span>);
//拖拽end

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

  productFormRef = createRef()

  componentDidMount() {
    console.log('isService', this.props.isService)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.editData !== this.props.editData) {
      const { editData } = this.props;
      (editData.bannerList || []).forEach((item, index) => {
        item.uid = item.id;
        item.status = 'done';
        item.name = '轮播图';
        item.url = item.link
      });
      (editData.detailList || []).forEach((item, index) => {
        item.uid = item.id;
        item.status = 'done';
        item.name = '详情图片';
        item.url = item.link
      });
      console.log('editData', editData)
      this.setState({
        activityRadio: editData.isActivity,
        coverLink: editData.coverLink,
        cover: editData.cover,
        bannerFileList: editData.bannerList || [],
        detailFileList: editData.detailList || [],
        agreementId: editData.agreementId,
        agreementLink: editData.agreementLink,
        agreementName: editData.agreementName,
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

  handleBannerChange = ({ file, fileList }) => {

    if (file.status === 'done') {
      this.setState((prevState) => ({
        bannerFileList: prevState.bannerFileList.concat(fileList)
      }), () => {
        this.productFormRef.current.setFieldsValue({
          bannerList: this.state.bannerFileList
        })
      })
    }
    console.log('handleBannerChange', file, fileList)
  };

  handleDetailChange = ({ file, fileList }) => {

    if (file.status === 'done' || file.status === 'removed') {
      this.setState((prevState) => ({
        detailFileList: prevState.detailFileList.concat(fileList)
      }), () => {
        this.productFormRef.current.setFieldsValue({
          detailList: this.state.detailFileList
        })
      })
    }
    console.log('handleDetailChange', file, fileList)
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


  handleOk = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      cover: '',
      coverLink: "",
      bannerFileList: [],
      detailFileList: [],
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      activityRadio: 0,
      agreementId: "",
      agreementLink: "",
      agreementName: '',
    })
  };

  onFinish = paramsData => {
    const params = paramsData;

    const { editData } = this.props;
    const { cover, coverLink, agreementId, agreementLink, agreementName, bannerFileList, detailFileList, } = this.state;
    if (!coverLink) {
      message.info('封面图必传');
      return;
    }
    if (!agreementLink) {
      message.info('合同必传');
      return;
    }
    if ((bannerFileList || []).filter(item => item.status === 'done').length <= 0) {
      message.info('轮播图必传');
      return;
    }

    params.agreementId = agreementId;
    params.agreementLink = agreementLink;
    params.agreementName = agreementName;
    params.cover = cover;
    params.coverLink = coverLink;
    const bannerList = [];
    const bannerImgIds = [];
    (bannerFileList || []).forEach(item => {
      if (item.status === 'done') {
        if (item.uid + '' === item.id + '') {
          bannerList.push({
            id: item.id + '',
            link: item.link,
          })
          bannerImgIds.push(item.id)
        } else {
          const { response: { data } } = item;
          bannerList.push({
            ...data
          })
          bannerImgIds.push(data.id)
        }
      }
    });
    const detailList = [];
    const detailImgIds = [];
    (detailFileList || []).forEach(item => {
      if (item.status === 'done') {
        if (item.uid + '' === item.id + '') {
          detailList.push({
            id: item.id + '',
            link: item.link,
          })
          detailImgIds.push(item.id)
        } else {
          const { response: { data } } = item;
          detailList.push({
            ...data
          })
          detailImgIds.push(data.id)
        }
      }
    });
    console.log('bannerImgIds', bannerImgIds, detailImgIds, detailFileList)
    bannerList.forEach((item, index) => {
      item.sort = index
    })
    params.bannerList = bannerList;
    params.bannerImgIds = bannerImgIds.join(',');
    detailList.forEach((item, index) => {
      item.sort = index
    })
    params.detailList = detailList;
    params.detailImgIds = detailImgIds.join(',');

    params.isService = getStateByParams('isService') || 0;
    if (editData.id) {
      params.id = editData.id;
      this.updateGood(params)
    } else {
      this.addGood(params);
    }

    console.log('params', params);
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

  onBannerSortEnd = ({ oldIndex, newIndex }) => {
    console.log('index', oldIndex, newIndex)
    this.setState(({ bannerFileList }) => ({
      bannerFileList: arrayMove(bannerFileList, oldIndex, newIndex),
    }));
  };

  onDetailSortEnd = ({ oldIndex, newIndex }) => {
    console.log('index', oldIndex, newIndex)
    this.setState(({ detailFileList }) => ({
      detailFileList: arrayMove(detailFileList, oldIndex, newIndex),
    }));
  };


  previewImage = async (file) => {
    console.log('previewImage-file: ', file);
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  }

  deleteBannerImage = (file) => {
    console.log('deleteBannerImage-file: ', file);
    this.setState((prevState) => ({
      bannerFileList: prevState.bannerFileList.filter(fileDemo => fileDemo.uid !== file.uid)
    }))
  }

  deleteDetailImage = (file) => {
    console.log('deleteDetailImage-file: ', file);
    this.setState((prevState) => ({
      detailFileList: prevState.detailFileList.filter(fileDemo => fileDemo.uid !== file.uid)
    }))
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
        <Form name="productForm" onFinish={this.onFinish} labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} initialValues={editData}
          ref={this.productFormRef}
        >
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
            <SortableContainer onSortEnd={this.onBannerSortEnd} axis="xy" helperClass="sortItem">
              {
                bannerFileList.map((file, index) => (
                  <SortableItem key={file.uid} index={index}>
                    <div className={styles.uploaderItem}>
                      <img src={file.url || file.preview || file.response.data.link} alt="" />
                      <div className={styles.handle}>
                        <div><EyeOutlined onClick={() => this.previewImage(file)} /> <DeleteOutlined onClick={() => this.deleteBannerImage(file)} /></div>
                      </div>
                    </div>
                  </SortableItem>
                ))
              }
            </SortableContainer>
            <Upload
              action="/v1/upload/uploadFile"
              data={{
                type: 2,
              }}
              listType="picture-card"
              fileList={[]}
              beforeUpload={(file) => this.beforeUpload(file, 2, ['image/jpeg', 'image/png'])}
              onChange={this.handleBannerChange}
            // itemRender={this.itemRender}
            >
              {bannerFileList.length >= 10 ? null : uploadButton}
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
                          rules={[
                            { required: true, message: '请输入' },
                            ({ getFieldValue }) => ({
                              validator(rule, value, callback) {
                                const goodsDetails = getFieldValue('goodsDetails');
                                console.log('goodsDetails', goodsDetails, value)
                                if (goodsDetails && goodsDetails.length > 0 && goodsDetails.filter(good => good.detailName === value).length > 1) {
                                  return callback('已存在该名称的品类');
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
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
              beforeUpload={(file) => this.beforeUpload(file, 4, ['application/pdf'])}
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
            <SortableContainer onSortEnd={this.onDetailSortEnd} axis="xy" helperClass="sortItem">
              {
                detailFileList.map((file, index) => (
                  <SortableItem key={file.uid} index={index}>
                    <div className={styles.uploaderItem}>
                      <img src={file.url || file.preview || file.response.data.link} alt="" />
                      <div className={styles.handle}>
                        <div><EyeOutlined onClick={() => this.previewImage(file)} /> <DeleteOutlined onClick={() => this.deleteDetailImage(file)} /></div>
                      </div>
                    </div>
                  </SortableItem>
                ))
              }
            </SortableContainer>
            <Upload
              name="file"
              action="/v1/upload/uploadFile"
              data={{
                type: 3,
              }}
              fileList={[]}
              listType="picture-card"
              onChange={this.handleDetailChange}
              beforeUpload={(file) => this.beforeUpload(file, 2, ['image/jpeg', 'image/png'])}
            >
              {detailFileList.length >= 10 ? null : uploadButton}
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
