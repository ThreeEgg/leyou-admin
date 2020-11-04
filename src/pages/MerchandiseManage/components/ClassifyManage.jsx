import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, } from 'antd'
import { getList } from '@/services/common'
import PageBack from "@/components/PageBack"

class ClassifyManage extends Component {

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
      title: '分类名称',
      dataIndex: '1',
    },
    {
      title: '包含商品',
      dataIndex: '2',
    },
    {
      title: '状态',
      dataIndex: '3',
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
      <PageContainer
        title={<PageBack title="分类管理"></PageBack> }
      >
        <ProTable
          // actionRef={this.actionRef}
          search={false}
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

export default ClassifyManage
