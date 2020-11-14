import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Space, } from 'antd'
import { getContractList } from '@/services/client'
import PageBack from "@/components/PageBack"
import { getStateByParams } from "@/utils/tools"

class Contract extends Component {

  state = {
    total: 0
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
      dataIndex: 'orderNumber',
    },
    {
      title: '完成时间',
      dataIndex: 'payTime',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: '操作',
      dataIndex: 'agreementLink',
      search: false,
      fixed: 'right',
      width: 80,
      render: (url) => (
        <Space>
          <Button type="link" size="small" onClick={() => this.viewContract(url)}>查看合同</Button>、
        </Space>
      ),
    },
  ]

  viewContract = (url) => {
    if (url) {
      window.open(url)
    }
  }

  formatParams = (paramsData) => {
    const params = paramsData;
    params.currentPage = params.current;
    delete params.current;
    const userId = getStateByParams('userId');
    if (userId) {
      params.userId = userId;
    }
    return params
  }

  render() {
    const { columns } = this;
    const { total, } = this.state;
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

            return getContractList(params)
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
      </PageContainer>
    )
  }
}

export default Contract
