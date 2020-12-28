import React, { Component, createRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, ExclamationCircleOutlined, } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, message, Modal, } from 'antd'
import { getCompanyList, handleCompany, } from '@/services/company'
import { history } from 'umi'
import moment from '@/utils/moment'
import EditModal from "./components/EditModal"

const typeArr = [
  { value: 'A', label: '农林牧渔|NL' }, { value: 'B', label: '采矿业|CK' },
  { value: 'C', label: '制造业|ZZ' }, { value: 'D', label: '电力、热力、燃气及水生产和供应业|DL' },
  { value: 'E', label: '建筑业|JZ' }, { value: 'F', label: '批发、商贸和零售业|PF' },
  { value: 'G', label: '交通运输、仓储和邮政业|JT' }, { value: 'H', label: '住宿和餐饮业|ZS' },
  { value: 'I', label: '信息传输、软件和信息技术服务业|XX' }, { value: 'J', label: '金融业|JR' },
  { value: 'K', label: '房地产业|FD' }, { value: 'L', label: '租赁和商务服务业|ZL' },
  { value: 'M', label: '科学研究和技术服务业|KX' }, { value: 'N', label: '水利、环境和公共设施管理业|SL' },
  { value: 'O', label: '卫生和社会工作|WS' }, { value: 'P', label: '教育|JY' },
  { value: 'Q', label: '科学研究和技术服务业|KX' }, { value: 'R', label: '文化、体育和娱乐业|WH' },
  { value: 'S', label: '公共管理、社会保障和社会组织|GG' }, { value: 'T', label: '其他|QT' }
]
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
      title: '企业编码',
      dataIndex: 'code',
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
      title: "行业分类",
      dataIndex: 'type',
      render: value => {
        return (typeArr.find(item => item.value === value) || {}).label;
      }
    },
    {
      title: "商业模式描述",
      dataIndex: 'desc',
      ellipsis: true
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
