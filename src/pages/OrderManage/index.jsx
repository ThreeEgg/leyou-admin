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
      search:false,
    },
    {
      title: '下单时间',
      dataIndex: '2',
      search:false,
    },
    {
      title: '完成时间',
      dataIndex: '3',
      search:false,
    },
    {
      title: '用户手机号',
      dataIndex: '3',
    },
    {
      title: '用户昵称',
      dataIndex: '3',
      search:false,
    },
    {
      title: '商品名称',
      dataIndex: '3',
      search:false,
    },
    {
      title: '商品类型',
      dataIndex: '3',
    },
    {
      title: '订单份额',
      dataIndex: '3',
      search:false,
    },
    {
      title: '订单状态',
      dataIndex: '3',
    },
    {
      title: '返还积分日期',
      dataIndex: '3',
      search:false,
    },
    {
      title: '操作',
      dataIndex: '4',
      search: false,
      fixed: 'right',
      width: 80,
      render: () => (
        <Space>
          <Button type="link" size="small" >变更状态</Button>
          <Button type="link" size="small" >返还积分设置</Button>
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
          toolBarRender={() => [
            <Button type="primary" size="small" key={1}>
              <PlusOutlined /> 新增
            </Button>,
          ]}
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
