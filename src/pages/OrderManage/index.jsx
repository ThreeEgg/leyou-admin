import React, { Component, createRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, message, Modal, Select, } from 'antd'
import { getOrderList, handleOrderStatus, } from '@/services/order'
import { getFirstClassifyList } from "@/services/classify"
import moment from "@/utils/moment"
import EditModal from "./components/EditModal"

const { Option } = Select;
const { confirm } = Modal;
class OrderManage extends Component {

  state = {
    editData: {},
    total: 0,
    firstClassifyList: [],
    flag: 0,
  }

  EditModalRef = createRef()
  actionRef = createRef()

  columns = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
      fixed: 'left'
    },
    {
      title: '订单编号',
      dataIndex: 'orderNumber',
      search: false,
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      search: false,
    },
    {
      title: '完成时间',
      dataIndex: 'payTime',
      valueType: 'dateRange',
      render: (value) => {
        return value.props && value.props.text;
      }
    },
    {
      title: '用户手机号',
      dataIndex: 'phone',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
      search: false,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      search: false,
    },
    {
      title: '商品类型',
      dataIndex: 'type',
      renderFormItem: () => {
        const { firstClassifyList } = this.state;
        return (
          <Select placeholder="请选择">
            {
              firstClassifyList.map(classifyItem => (
                <Option key={classifyItem.id} value={classifyItem.id}>{classifyItem.typeName}</Option>
              ))
            }
          </Select>
        )
      },
      renderText: (_, item) => {
        return item.typeName
      }
    },
    {
      title: '购买数量',
      dataIndex: 'goodsCount',
      search: false,
    },
    {
      title: '订单总额',
      dataIndex: 'totalPrice',
      search: false,
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      valueEnum: {
        0: '未支付',
        1: '已完成',
        2: '已失效'
      }
    },
    {
      title: '服务到期时间',
      dataIndex: 'serviceTerm',
      search: false,
    },
    {
      title: '操作',
      dataIndex: '4',
      search: false,
      fixed: 'right',
      width: 80,
      render: (_, item) => (
        <Space>
          {
            (item.orderStatus === 0 || item.orderStatus === 1) && item.typeName !== "实物类产品" &&
            <Button type="link" size="small" onClick={() => this.handleConfirm(item)}>变更状态</Button>
          }
          {
            item.orderStatus === 0 && item.typeName !== "实物类产品" && <Button type="link" size="small" onClick={() => { this.handleModal(3, item) }}>修改金额</Button>
          }
          {
            item.orderStatus === 1 && item.typeName !== "实物类产品" && <>
              <Button type="link" size="small" >商品活动</Button>
              <Button type="link" size="small" onClick={() => { this.handleModal(2, item) }}>服务时间设置</Button>
            </>
          }
          {
            item.typeName === "实物类产品" && <Button type="link" size="small" onClick={() => { this.handleModal(1, item) }}>上传快递单号</Button>
          }
          {
            item.typeName !== "实物类产品" && <Button type="link" size="small" onClick={() => this.viewContract(item.agreementLink)}>查看合同</Button>
          }

        </Space>
      ),
    },
  ]

  componentDidMount() {
    this.getFirstClassifyList()
  }

  handleModal = (flag, editData) => {
    this.setState({
      flag, editData,
    }, () => {
      this.EditModalRef.current.handleOk()
    })
  }

  viewContract = (url) => {
    if (url) {
      window.open(url)
    }
  }

  getFirstClassifyList = async () => {
    const { success, msg, data, } = await getFirstClassifyList();
    if (success) {
      this.setState({
        firstClassifyList: data
      })
    } else {
      message.error(msg)
    }
  }

  handleConfirm = (item) => {
    const params = {
      id: item.id,
      status: item.orderStatus === 0 ? 1 : 2
    }
    confirm({
      title: '确认操作',
      icon: <ExclamationCircleOutlined />,
      content: `确认将状态变更为${item.orderStatus === 0 ? '已完成' : '已失效'}？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        this.handleOrderStatus(params);
      },
      onCancel() {
      },
    })
  }

  handleOrderStatus = async params => {
    const { success, msg } = await handleOrderStatus(params);
    if (success) {
      message.success(`变更成功`);
      this.reload();
    } else {
      message.error(msg)
    }
  }

  formatParams = (paramsData) => {
    const params = paramsData;
    console.log('params', params);
    params.currentPage = params.current;
    delete params.current;
    if (params.payTime) {
      params.startTime = moment(params.payTime[0]).format("YYYY-MM-DD") + ' 00:00:00';
      params.endTime = moment(params.payTime[1]).format("YYYY-MM-DD") + ' 23:59:59';
      delete params.payTime;
    }
    return params
  }

  reload = () => {
    if (this.actionRef.current) {
      this.actionRef.current.reload()
    }
  }

  render() {
    const { columns } = this;
    const { editData, total, flag, } = this.state;
    return (
      <PageContainer>
        <ProTable
          actionRef={this.actionRef}
          // search={false}
          columns={columns}
          rowKey="id"
          request={(paramsData, sorter) => {
            const params = this.formatParams(paramsData, sorter)

            return getOrderList(params)
          }}
          postData={(data) => {
            if (data) {
              this.setState({ total: data.total })
              return data.list
            }
            return []
          }}
          pagination={{
            total,
            showQuickJumper: true,
            showLessItems: true,
            showSizeChanger: true,
          }}
          options={{
            fullScreen: false
          }}
        />
        <EditModal ref={this.EditModalRef} editData={editData} reload={this.reload} flag={flag} />
      </PageContainer>
    )
  }
}

export default OrderManage
