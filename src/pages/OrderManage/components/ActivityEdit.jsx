import React, { Component } from 'react'
import { Modal, Form, message, InputNumber, Radio, Row, Col, } from 'antd';
import { updateActivity, } from "@/services/order"
// import moment from "@/utils/moment"

class ActivityEdit extends Component {

  state = {
    visible: false,
    activityRadio: 0,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.editData !== this.props.editData) {
      const { editData } = this.props;
      this.setState({
        activityRadio: editData.isActivity
      })
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
    const { editData, } = this.props;
    const params = paramsData;
    params.id = editData.id;
    this.updateActivity(params);
    console.log('params', params);
  }


  updateActivity = async params => {
    const { success, msg } = await updateActivity(params);
    if (success) {
      message.success('修改成功');
      this.handleCancel();
      this.props.reload();
    } else {
      message.error(msg)
    }
  }


  render() {
    const { visible, activityRadio, } = this.state;
    const { editData, } = this.props;
    return (
      <Modal
        title="编辑活动信息"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okButtonProps={{
          htmlType: 'submit',
          form: 'activityForm'
        }}
        destroyOnClose
      >
        <Form name="activityForm" onFinish={this.onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} initialValues={editData}>
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
              <Row style={{ paddingLeft: 14 }}>
                <Col span={10}>
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
                <Col span={13}>
                  <Form.Item label="延长服务时间(月)" name="extraTime" wrapperCol={{ span: 10 }} labelCol={{ span: 14 }}
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
        </Form>
      </Modal>
    )
  }

}

export default ActivityEdit