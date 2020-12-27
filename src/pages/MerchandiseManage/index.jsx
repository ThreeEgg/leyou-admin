import React, { Component, createRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, ExclamationCircleOutlined, MenuOutlined, } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, Modal, message, } from 'antd'
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { getClassifyList, handleClassify, deleteClassify, classifySort, } from '@/services/classify'
import { history } from "umi";
import EditModal from "./components/EditModal"
const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));
const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);


const { confirm } = Modal;
class MerchandiseManage extends Component {

  state = {
    editData: {},
    total: 0,
    dataSource: [],
    loading: false,
  }

  EditModalRef = createRef()
  actionRef = createRef()

  columns = [
    {
      title: '排序',
      dataIndex: 'sort',
      width: 68,
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
    {
      title: '分类名称',
      dataIndex: 'typeName',
      className: 'drag-visible',
    },
    {
      title: '商品类型',
      dataIndex: 'isService',
      valueEnum: {
        0: '实物产品',
        1: '服务产品'
      }
    },
    {
      title: '包含商品',
      dataIndex: 'goodsCount',
    },
    {
      title: '状态',
      dataIndex: 'isSale',
      valueEnum: {
        0: '已下架',
        1: '上架中'
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      search: false,
      width: 80,
      className: 'drag-visible',
      render: (_, item) => (
        <Space>
          {/* <Button type="link" size="small" >排序</Button> */}
          {
            item.isSale === 1 ? <Button type="link" size="small" onClick={() => this.handleConfirm(0, item.id)}>下架</Button>
              :
              <Button type="link" size="small" onClick={() => this.handleConfirm(1, item.id)}>上架</Button>
          }
          <Button type="link" size="small" onClick={() => this.handleEdit(2, item)}>编辑</Button>
          <Button type="link" size="small" onClick={() => this.gotoClassManage(item)}>查看全部</Button>
          <Button type="link" size="small" danger onClick={() => this.handleConfirm(2, item.id)}>删除</Button>
        </Space>
      ),
    },
  ]

  componentDidMount() {
    this.getClassifyList();
  }

  getClassifyList = async () => {
    this.setState({
      loading: true,
    })
    const params = {}
    const { data, success } = await getClassifyList(params);
    if (success) {
      this.setState({
        dataSource: data,
        loading: false
      })
    }
  }

  handleConfirm = (flag, idsStr) => {
    let params = {};
    let content = "";
    let fun = "";
    if (flag === 2) {
      params = {
        id: idsStr
      }
      content = "确认删除该分类？";
      fun = "deleteClassify"
    } else {
      params = {
        idsStr,
        isSale: flag ? '1' : '0'
      }
      content = `确认${params.isSale === '1' ? '上架' : '下架'}该分类？`;
      fun = "handleClassify"
    }
    confirm({
      title: '确认操作',
      icon: <ExclamationCircleOutlined />,
      content,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        this[fun](params);
      },
      onCancel() {
      },
    })
  }

  deleteClassify = async params => {
    const { success, msg } = await deleteClassify(params);
    if (success) {
      message.success(`删除成功`);
      this.reload();
    } else {
      message.error(msg)
    }
  }

  handleClassify = async params => {
    const { success, msg } = await handleClassify(params);
    if (success) {
      message.success(`${params.isSale === '1' ? '上架' : '下架'}成功`);
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

  formatParams = (paramsData) => {
    const params = paramsData;
    console.log('params', params);
    params.currentPage = params.current;
    delete params.current;
    return params
  }

  gotoClassManage = (item) => {
    console.log('item', item)
    history.push({
      pathname: `/merchandiseManage/productManage`,
      state: {
        type: item.id,
        parentId: item.parentId,
        isService: item.isService,
      }
    })
  }

  reload = () => {
    console.log('this.actionRef.current', this.actionRef.current)
    this.getClassifyList()
  }

  classifySort = async (params) => {
    const { success } = await classifySort(params);
    if (success) {
      this.reload()
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = this.state;
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
      // console.log('Sorted items: ', newData);
      this.setState({
        loading: true
      })
      const params = [];
      newData.forEach((item, index) => {
        params.push({
          id: item.id,
          sort: index
        })
      })
      this.classifySort(params)
      this.setState({ dataSource: newData });
    }
  };

  DraggableBodyRow = ({ className, style, ...restProps }) => {
    const { dataSource } = this.state;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(x => x.id === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  render() {
    const { columns } = this;
    const { editData, total, dataSource, loading, } = this.state;
    const DraggableContainer = props => (
      <SortableContainer
        useDragHandle
        helperClass="row-dragging"
        onSortEnd={this.onSortEnd}
        {...props}
      />
    );
    return (
      <PageContainer>
        <ProTable
          actionRef={this.actionRef}
          search={false}
          rowKey="id"
          columns={columns}
          toolBarRender={() => [
            <Button type="primary" size="small" key={1} onClick={() => this.handleEdit(1, {})}>
              <PlusOutlined /> 新增
            </Button>,
          ]}
          pagination={false}
          options={{
            fullScreen: false,
            reload: () => {
              this.getClassifyList()
            }
          }}
          loading={loading}
          dataSource={dataSource}
          components={{
            body: {
              wrapper: DraggableContainer,
              row: this.DraggableBodyRow,
            },
          }}
        />
        <EditModal ref={this.EditModalRef} editData={editData} reload={this.reload} />
      </PageContainer>
    )
  }
}

export default MerchandiseManage
