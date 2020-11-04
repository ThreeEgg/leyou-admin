import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, FormOutlined, } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, } from 'antd'
import { getList } from '@/services/common'

class MerchandiseManage extends Component {

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
      title: '商品名称',
      dataIndex: '1',
    },
    {
      title: '所属分类',
      dataIndex: '2',
    },
    {
      title: '商品类型',
      dataIndex: '3',
    },
    {
      title: '剩余库存(总)',
      dataIndex: '4',
    },
    {
      title: '单价',
      dataIndex: '5',
    },
    {
      title: '状态',
      dataIndex: '6',
    },
    {
      title: '操作',
      dataIndex: '4',
      search: false,
      fixed: 'right',
      width: 80,
      render: () => (
        <Space>
          <Button type="link" size="small" >上架</Button>
          <Button type="link" size="small" >编辑</Button>
          <Button type="link" size="small" >品类管理</Button>
          <Button type="link" size="small" >合同管理</Button>
          <Button type="link" size="small" danger>删除</Button>
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
          search={false}
          columns={columns}
          toolBarRender={() => [
            <Button type="primary" size="small" key={2}>
              <FormOutlined /> 分类管理
            </Button>,
            <Button type="primary" size="small" key={1}>
              <PlusOutlined /> 新建
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

export default MerchandiseManage
