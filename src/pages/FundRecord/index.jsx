import React, { Component } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, } from 'antd'
import { getList } from '@/services/common'


class FundRecord extends Component {

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
      title: '操作时间',
      dataIndex: '1',
    },
    {
      title: '手机号',
      dataIndex: '1',
    },
    {
      title: '操作',
      dataIndex: '2',
    },
    {
      title: '备注',
      dataIndex: '2',
    },
    {
      title: '额度',
      dataIndex: '3',
    }
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

export default FundRecord
