import React, { Component, createRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, } from 'antd'
import { getClientList } from '@/services/client'
import { history } from "umi"
import EditModal from "./components/EditModal"
import moment from "@/utils/moment"

class ClientManage extends Component {

  state = {
    editData: {},
    total: 0,
  }

  EditModalRef = createRef();
  actionRef = createRef();

  columns = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
      fixed: 'left'
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      title: '身份证号',
      dataIndex: 'idCard',
    },
    {
      title: '企业名称',
      dataIndex: 'companyName',
      hideInTable: true,
    },
    {
      title: '可查看企业',
      dataIndex: 'showCompanyName',
      search: false,
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      render: (value) => {
        return value.props && value.props.text;
      }
    },
    {
      title: '当前有效合同数量',
      dataIndex: 'validCount',
      search: false,
    },
    {
      title: '历史合同数量',
      dataIndex: 'validCount',
      search: false,
    },
    {
      title: '簿记豆',
      dataIndex: 'totalPoint',
      search: false,
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastLoginTime',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'id',
      search: false,
      fixed: 'right',
      width: 80,
      render: (_, item) => (
        <Space>
          <Button type="link" size="small" onClick={() => this.gotoFundChange(item.id)}>簿记豆变更</Button>
          <Button type="link" size="small" onClick={() => this.handleEdit(2, item)}>编辑</Button>
          <Button type="link" size="small" onClick={() => this.gotoContract(item.id)}>查看合同</Button>
        </Space>
      ),
    },
  ]

  handleEdit = (flag, editData) => {
    if (editData.companyIds) {
      editData.companyIds = editData.companyIds.split(',')
    } else {
      editData.companyIds = [];
    }
    this.setState({
      editData
    }, () => {
      this.EditModalRef.current.handleOk()
    })
  }

  gotoFundChange = (id) => {
    history.push({
      pathname: `/clientManage/FundChange`,
      state: {
        userId: id
      }
    })
  }

  gotoContract = (id) => {
    history.push({
      pathname: `/clientManage/contract`,
      state: {
        userId: id
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
          // search={false}
          rowKey="id"
          columns={columns}
          toolBarRender={() => [
            <Button type="primary" size="small" key={1} onClick={() => this.handleEdit(1, {})}>
              <PlusOutlined /> 新增
            </Button>,
          ]}
          request={(paramsData, sorter) => {
            const params = this.formatParams(paramsData, sorter)

            return getClientList(params)
          }}
          postData={(data) => {
            if (data) {
              this.setState({ total: data.total })
              return data.list;
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
        <EditModal ref={this.EditModalRef} editData={editData} reload={this.reload} />
      </PageContainer>
    )
  }
}

export default ClientManage
