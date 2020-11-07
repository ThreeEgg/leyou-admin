import React, { Component } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, } from 'antd'
import { getList } from '@/services/common'


class OrderManage extends Component {

  state = {

  }

  columns = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
      fixed: true
    },
    {
      title: '订单编号',
      dataIndex: '1',
      search: false,
    },
    {
      title: '下单时间',
      dataIndex: '2',
      search: false,
    },
    {
      title: '完成时间',
      dataIndex: '3',
      search: false,
    },
    {
      title: '用户手机号',
      dataIndex: '3',
    },
    {
      title: '姓名',
      dataIndex: '3',
      search: false,
    },
    {
      title: '商品名称',
      dataIndex: '3',
      search: false,
    },
    {
      title: '商品类型',
      dataIndex: '3',
    },
    {
      title: '购买数量',
      dataIndex: '3',
      search: false,
    },
    {
      title: '订单总额',
      dataIndex: '3',
    },
    {
      title: '订单状态',
      dataIndex: '3',
      search: false,
    },
    {
      title: '服务到期时间',
      dataIndex: '3',
      search: false,
    },
    {
      title: '操作',
      dataIndex: '4',
      search: false,
      fixed: 'right',
      width: 80,
      render: () => (
        <Space>
          <Button type="link" size="small" >查看合同</Button>
          <Button type="link" size="small" >变更状态</Button>
          <Button type="link" size="small" >修改金额</Button>
          <Button type="link" size="small" >商品活动</Button>
          <Button type="link" size="small" >服务时间设置</Button>
          <Button type="link" size="small" >上传快递单号</Button>
          <Button type="link" size="small" >查看合同</Button>
        </Space>
      ),
    },
  ]

  formatParams = (paramsData) => {
    return paramsData
  }

  render() {
    const { columns } = this;
    return (
      <PageContainer>
        <ProTable
          // actionRef={this.actionRef}
          // search={false}
          columns={columns}
          request={(paramsData, sorter) => {
            const params = this.formatParams(paramsData, sorter)

            return getList(params)
          }}
          postData={(data) => {
            if (data) {
              return data.list
            }
            return []
          }}
          pagination={{
            showQuickJumper: true,
            showLessItems: true,
            showSizeChanger: true,
          }}
          options={{
            fullScreen: false
          }}
        />
      </PageContainer>
    )
  }
}

export default OrderManage
