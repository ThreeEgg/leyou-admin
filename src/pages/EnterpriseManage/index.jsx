import React, { Component, createRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, ExclamationCircleOutlined, } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, message, Modal, } from 'antd'
import { getCompanyList, handleCompany, } from '@/services/company'
import { history } from 'umi'
import moment from '@/utils/moment'
import EditModal from "./components/EditModal"

const { confirm } = Modal;
class EnterpriseManage extends Component {

  state = {
    editData: {},
    total: 0,
  }

  EditModalRef = createRef()
  actionRef = createRef()

  columns = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
      fixed: 'left'
    },
    {
      title: '企业名称',
      dataIndex: 'companyName',
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'creditCode',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      hideInTable: true,
    },
    {
      title: '可查看手机号',
      dataIndex: 'showUserPhone',
      ellipsis: true,
      search: false,
    },
    {
      title: '企业添加时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      render: (value) => {
        return value.props && value.props.text;
      }
    },
    {
      title: '状态',
      dataIndex: 'isUsed',
      search: false,
      valueEnum: {
        0: '已停用',
        1: '已启用'
      }
    },
    {
      title: '报表数量',
      dataIndex: 'reportCount',
      search: false,
    },
    {
      title: '最后更新报表时间',
      dataIndex: 'lastUpdateTime',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'id',
      search: false,
      fixed: 'right',
      width: 180,
      render: (_, item) => (
        <Space>
          {
            item.isUsed === 1 ? <Button type="link" size="small" onClick={() => this.handleConfirm(0, item.id)}>停用</Button>
              :
              <Button type="link" size="small" onClick={() => this.handleConfirm(1, item.id)}>启用</Button>
          }
          <Button type="link" size="small" onClick={() => this.handleEdit(2, item)}>编辑</Button>
          <Button type="link" size="small" onClick={() => this.gotoReport(item.id)}>全部报表</Button>
        </Space>
      ),
    },
  ]

  handleConfirm = (flag, idsStr) => {
    const params = {
      idsStr,
      isUsed: flag ? '1' : '0'
    }
    confirm({
      title: '确认操作',
      icon: <ExclamationCircleOutlined />,
      content: `确认${params.isUsed === '1' ? '启用' : '停用'}该企业？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        this.handleCompany(params);
      },
      onCancel() {
      },
    })
  }

  handleCompany = async params => {
    const { success, msg } = await handleCompany(params);
    if (success) {
      message.success(`${params.isUsed === '1' ? '启用' : '停用'}成功`);
      this.reload();
    } else {
      message.error(msg)
    }
  }

  handleEdit = (flag, editData) => {
    this.setState({
      editData
    }, () => {
      this.EditModalRef.current.handleOk()
    })
  }

  gotoReport = (companyId) => {
    history.push({
      pathname: `/enterpriseManage/reportForm`,
      state: {
        companyId
      }
    })
  }

  formatParams = (paramsData) => {
    const params = paramsData;
    console.log('params', params);
    if (params.createTime) {
      params.startTime = moment(params.createTime[0]).format("YYYY-MM-DD") + ' 00:00:00';
      params.endTime = moment(params.createTime[1]).format("YYYY-MM-DD") + ' 23:59:59';
      delete params.createTime;
    }
    params.currentPage = params.current;
    delete params.current;
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
      <PageContainer>
        <ProTable
          actionRef={this.actionRef}
          search={{
            labelWidth: 140,
          }}
          rowKey="id"
          columns={columns}
          toolBarRender={() => [
            <Button type="primary" size="small" key={1} onClick={() => this.handleEdit(1, {})}>
              <PlusOutlined /> 新增
            </Button>,
          ]}
          request={(paramsData, sorter) => {
            const params = this.formatParams(paramsData, sorter)

            return getCompanyList(params)
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
          scroll={{
            x: 1920
          }}
        />
        <EditModal ref={this.EditModalRef} editData={editData} reload={this.reload} />
      </PageContainer>
    )
  }
}

export default EnterpriseManage
