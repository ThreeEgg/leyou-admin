import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Space, } from 'antd'
import { getList } from '@/services/common'
import PageBack from "@/components/PageBack"

class ReportForm extends Component {

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
      title: '月份',
      dataIndex: '1',
    },
    {
      title: '营业收入',
      dataIndex: '2',
    },
    {
      title: '净利润',
      dataIndex: '3',
    },
    {
      title: '总资产',
      dataIndex: '3',
    },
    {
      title: '净资产',
      dataIndex: '3',
    },
    {
      title: '资产负债表',
      dataIndex: '3',
      render:()=>{
        <Button type="link">下载</Button>
      }
    },
    {
      title: '利润表',
      dataIndex: '3',
      render:()=>{
        <Button type="link">下载</Button>
      }
    },
    {
      title: '现金流量表',
      dataIndex: '3',
      render:()=>{
        <Button type="link">下载</Button>
      }
    },
    {
      title: '操作',
      dataIndex: '4',
      search: false,
      fixed: 'right',
      width: 80,
      render: () => (
        <Space>
          <Button type="link" size="small" >数据修改</Button>
          <Button type="link" size="small" >上传报表</Button>
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
        title={<PageBack title="全部报表"></PageBack> }
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

export default ReportForm
