import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Space, } from 'antd'
import { getList } from '@/services/common'
import PageBack from "@/components/PageBack"

class Contract extends Component {

  state = {

  }

  columns = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
      fixed: 'left'
    },
    {
      title: '订单编号',
      dataIndex: '1',
    },
    {
      title: '完成时间',
      dataIndex: '2',
    },
    {
      title: '商品名称',
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
          <Button type="link" size="small" >查看合同</Button>、
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
        title={<PageBack title="查看合同"></PageBack>}
      >
        <ProTable
          // actionRef={this.actionRef}
          search={false}
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

export default Contract
