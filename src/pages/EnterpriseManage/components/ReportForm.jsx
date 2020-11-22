import React, { Component, createRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Space, Upload, message, } from 'antd'
import { getReportList } from '@/services/company'
import PageBack from "@/components/PageBack"
import { getStateByParams } from '@/utils/tools'
import ReportEdit from "./ReportEdit"
import ReportModal from './ReportModal'


class ReportForm extends Component {

  state = {
    editData: {},
    total: 0,
  }

  actionRef = createRef()
  ReportEditRef = createRef()
  ReportModalRef = createRef()

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
      title: '营业收入(年)',
      dataIndex: 'businessIncomeYear',
    },
    {
      title: '净利润(年)',
      dataIndex: 'netProfitYear',
    },
    {
      title: '营业收入(月)',
      dataIndex: 'businessIncomeMouth',
    },
    {
      title: '净利润(月)',
      dataIndex: 'netProfitMouth',
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
      render: (url, item) => {
        if (url && url !== '-') {
          return (
            <Space>
              <Button type="link"><a href={url} download="资产负债表">下载</a></Button>
            </Space>
          )
        } else {
          return '-';
        }
      }
    },
    {
      title: '利润表',
      dataIndex: 'profitLink',
      render: (url, item) => {
        if (url && url !== '-') {
          return (
            <Space>
              <Button type="link"><a href={url} download="利润表">下载</a></Button>
            </Space>
          )
        } else {
          return '-';
        }
      }
    },
    {
      title: '现金流量表',
      dataIndex: 'moneyLink',
      render: (url, item) => {
        if (url && url !== '-') {
          return (
            <Space>
              <Button type="link"><a href={url} download="现金流量表">下载</a></Button>
            </Space>
          )
        } else {
          return '-';
        }
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
          <Button type="link" size="small" onClick={() => this.uploadReport(item)}>上传报表</Button>
        </Space>
      ),
    },
  ]

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log('file', info.file)
      const { response: { success } } = info.file;
      if (success) {
        message.success('上传成功');
        this.reload();
      } else {
        message.error('上传失败');
      }
      return;
    }
    if (info.file.status === 'error') {
      message.error('上传失败');
    }
  };



  handleUpdate = (editData) => {
    this.setState({
      editData
    }, () => {
      this.ReportEditRef.current.handleOk()
    })
  }

  uploadReport = (editData) => {
    this.setState({
      editData
    }, () => {
      this.ReportModalRef.current.handleOk()
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
        <ReportModal ref={this.ReportModalRef} reportId={editData.id} reload={this.reload}></ReportModal>
      </PageContainer>
    )
  }
}

export default ReportForm
