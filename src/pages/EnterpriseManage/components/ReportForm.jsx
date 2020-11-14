import React, { Component, createRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Space, } from 'antd'
import { getReportList } from '@/services/company'
import PageBack from "@/components/PageBack"
import { getStateByParams } from '@/utils/tools'
import ReportEdit from "./ReportEdit"

class ReportForm extends Component {

  state = {
    editData: {},
    total: 0,
  }

  actionRef = createRef()
  ReportEditRef = createRef()

  columns = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
      fixed: 'left'
    },
    {
      title: '月份',
      dataIndex: 'showTimeStr',
    },
    {
      title: '营业收入',
      dataIndex: 'businessIncome',
    },
    {
      title: '净利润',
      dataIndex: 'netProfit',
    },
    {
      title: '总资产',
      dataIndex: 'totalAssets',
    },
    {
      title: '净资产',
      dataIndex: 'netAssets',
    },
    {
      title: '资产负债表',
      dataIndex: 'balanceLink',
      render: (url) => {
        <Button type="link" onClick={() => this.downloadFile(url)}>下载</Button>
      }
    },
    {
      title: '利润表',
      dataIndex: 'profitLink',
      render: (url) => {
        <Button type="link" onClick={() => this.downloadFile(url)}>下载</Button>
      }
    },
    {
      title: '现金流量表',
      dataIndex: 'moneyLink',
      render: (url) => {
        <Button type="link" onClick={() => this.downloadFile(url)}>下载</Button>
      }
    },
    {
      title: '操作',
      dataIndex: '4',
      search: false,
      fixed: 'right',
      width: 80,
      render: (_, item) => (
        <Space>
          <Button type="link" size="small" onClick={() => this.handleUpdate(item)}>数据修改</Button>
          <Button type="link" size="small" >上传报表</Button>
        </Space>
      ),
    },
  ]

  handleUpdate = (editData) => {
    this.setState({
      editData
    }, () => {
      this.ReportEditRef.current.handleOk()
    })
  }

  downloadFile = url => {
    if (url) {
      window.location.href = url
    }
  }

  formatParams = (paramsData) => {
    const params = paramsData;
    params.currentPage = params.current;
    delete params.current;
    const companyId = getStateByParams('companyId');
    if (companyId) {
      params.companyId = companyId;
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
    const { editData, total, } = this.state;
    return (
      <PageContainer
        title={<PageBack title="全部报表"></PageBack>}
      >
        <ProTable
          actionRef={this.actionRef}
          search={false}
          columns={columns}
          rowKey="id"
          request={(paramsData, sorter) => {
            const params = this.formatParams(paramsData, sorter)

            return getReportList(params)
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
        <ReportEdit ref={this.ReportEditRef} editData={editData} reload={this.reload}></ReportEdit>
      </PageContainer>
    )
  }
}

export default ReportForm
