import React, { Component, createRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Space, Upload, message, } from 'antd'
import { getReportList } from '@/services/company'
import PageBack from "@/components/PageBack"
import { getStateByParams } from '@/utils/tools'
import ReportEdit from "./ReportEdit"

const fileTypeList = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
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
      render: (url, item) => {
        if (url && url !== '-') {
          return (
            <Space>
              <Button type="link"><a href={url} download="资产负债表">下载</a></Button>
              <Upload
                name="file"
                action="/v1/upload/uploadFile"
                data={{
                  type: 6,
                  id: item.id
                }}
                showUploadList={false}
                beforeUpload={(file) => this.beforeUpload(file, 4, fileTypeList)}
                onChange={this.handleChange}
              >
                <Button type="link">更换</Button>
              </Upload>
            </Space>
          )
        } else {
          return (
            <Upload
              name="file"
              action="/v1/upload/uploadFile"
              data={{
                type: 6,
                id: item.id
              }}
              showUploadList={false}
              beforeUpload={(file) => this.beforeUpload(file, 4, fileTypeList)}
              onChange={this.handleChange}
            >
              <Button type="link">上传</Button>
            </Upload>
          )
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
              <Upload
                name="file"
                action="/v1/upload/uploadFile"
                data={{
                  type: 7,
                  id: item.id
                }}
                showUploadList={false}
                beforeUpload={(file) => this.beforeUpload(file, 4, fileTypeList)}
                onChange={this.handleChange}
              >
                <Button type="link">更换</Button>
              </Upload>
            </Space>
          )
        } else {
          return (
            <Upload
              name="file"
              action="/v1/upload/uploadFile"
              data={{
                type: 7,
                id: item.id
              }}
              showUploadList={false}
              beforeUpload={(file) => this.beforeUpload(file, 4, fileTypeList)}
              onChange={this.handleChange}
            >
              <Button type="link">上传</Button>
            </Upload>
          )
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
              <Upload
                name="file"
                action="/v1/upload/uploadFile"
                data={{
                  type: 8,
                  id: item.id
                }}
                showUploadList={false}
                beforeUpload={(file) => this.beforeUpload(file, 4, fileTypeList)}
                onChange={this.handleChange}
              >
                <Button type="link">更换</Button>
              </Upload>
            </Space>
          )
        } else {
          return (
            <Upload
              name="file"
              action="/v1/upload/uploadFile"
              data={{
                type: 8,
                id: item.id
              }}
              showUploadList={false}
              beforeUpload={(file) => this.beforeUpload(file, 4, fileTypeList)}
              onChange={this.handleChange}
            >
              <Button type="link">上传</Button>
            </Upload>
          )
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
          {/* <Button type="link" size="small" >上传报表</Button> */}
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

  beforeUpload = (file, size, fileType) => {
    console.log('file', file)
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isJpgOrPng = !!fileType.find(item => item === file.type);
    if (!isJpgOrPng) {
      message.error('文件格式不符');
    }
    const isLt2M = file.size / 1024 / 1024 < size;
    if (!isLt2M) {
      message.error(`文件大小限制${size}M`);
    }
    return isJpgOrPng && isLt2M;
  }

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
