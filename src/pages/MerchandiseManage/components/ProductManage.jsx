import React, { Component, createRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, ExclamationCircleOutlined, MenuOutlined, } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, Modal, message, } from 'antd'
import { getGoodList, handleGood, deleteGood, goodSort, getGoodDetail, } from '@/services/merchandise'
import PageBack from "@/components/PageBack"
import ProduceEditModal from "./ProductEditModal"
import CountEdit from './CountEdit'
import { getStateByParams } from "@/utils/tools"
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { create } from 'lodash';
const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));
const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);


const { confirm } = Modal;
class ProductManage extends Component {

  state = {
    editData: {},
    countEditData: {},
    total: 0,
    dataSource: [],
    loading: false,
  }

  ProduceEditModalRef = createRef();
  CountEditRef = createRef()
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
      title: '商品名称',
      dataIndex: 'goodsName',
      className: 'drag-visible',
    },
    {
      title: '商品分类',
      dataIndex: 'typeName',
    },
    {
      title: '品类数量',
      dataIndex: 'detailCount',
    },
    {
      title: '实际销售数量',
      dataIndex: 'countTemp',
    },
    {
      title: '展示销售数量',
      dataIndex: 'salesCount',
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
          <Button type="link" size="small" >排序</Button>
          <Button type="link" size="small" onClick={() => this.handleConfirm(1, item)}>{item.isSale === 0 ? '上架' : '下架'}</Button>
          <Button type="link" size="small" onClick={() => this.handleEdit(2, item)}>编辑</Button>
          <Button type="link" size="small" onClick={() => this.handleCountEdit(item)}>销售数量修改</Button>
          <Button type="link" size="small" danger onClick={() => this.handleConfirm(2, item)}>删除</Button>
        </Space>
      ),
    },
  ]

  componentDidMount() {
    this.getGoodList()
  }

  getGoodList = async () => {
    this.setState({
      loading: true
    })
    let params = {};
    const type = getStateByParams('type');
    if (type) {
      params.type = type;
    }

    const { data, success } = await getGoodList(params);
    if (success) {
      this.setState({
        dataSource: data,
        loading: false
      })
    }
  }

  handleConfirm = (flag, item) => {
    let params = {};
    let content = "";
    let fun = "";
    if (flag === 2) {
      params = {
        id: item.id
      }
      content = "确认删除该商品？";
      fun = "deleteGood"
    } else {
      params = {
        id: item.id,
        isSale: item.isSale ? '0' : '1'
      }
      content = `确认${params.isSale === '1' ? '上架' : '下架'}该商品？`;
      fun = "handleGood"
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

  deleteGood = async params => {
    const { success, msg } = await deleteGood(params);
    if (success) {
      message.success(`删除成功`);
      this.reload();
    } else {
      message.error(msg)
    }
  }

  handleGood = async params => {
    const { success, msg } = await handleGood(params);
    if (success) {
      message.success(`${params.isSale === '1' ? '上架' : '下架'}成功`);
      this.reload();
    } else {
      message.error(msg)
    }
  }

  getGoodDetail = async (id) => {
    const { success, data } = await getGoodDetail({ id });
    if (success) {
      this.setState({
        editData: data
      }, () => {
        this.ProduceEditModalRef.current.handleOk()
      })
    } else {
      message.error('获取商品详情失败')
    }
  }

  handleCountEdit = (countEditData) => {
    this.setState({
      countEditData
    }, () => {
      this.CountEditRef.current.handleOk()
    })
  }

  handleEdit = (flag, editData) => {
    if (flag === 1) {
      this.setState({
        editData
      }, () => {
        this.ProduceEditModalRef.current.handleOk()
      })
    } else {
      this.getGoodDetail(editData.id)
    }

  }

  formatParams = (paramsData) => {
    const params = paramsData;
    const type = getStateByParams('type');
    if (type) {
      params.type = type;
    }
    params.currentPage = params.current;
    delete params.current;
    return params
  }

  reload = () => {
    this.getGoodList()
  }

  goodSort = async (params) => {
    const { success } = await goodSort(params);
    if (success) {
      this.reload()
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = this.state;
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
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
      this.goodSort(params)
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
    const { editData, countEditData, dataSource, loading, } = this.state;
    const DraggableContainer = props => (
      <SortableContainer
        useDragHandle
        helperClass="row-dragging"
        onSortEnd={this.onSortEnd}
        {...props}
      />
    );
    return (
      <PageContainer
        title={<PageBack title="商品管理"></PageBack>}
      >
        <ProTable
          actionRef={this.actionRef}
          search={false}
          rowKey="id"
          columns={columns}
          toolBarRender={() => [
            <Button type="primary" size="small" key={1} onClick={() => this.handleEdit(1)}>
              <PlusOutlined /> 新增
            </Button>,
          ]}
          pagination={false}
          options={{
            fullScreen: false,
            reload: () => {
              this.getGoodList()
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
        <ProduceEditModal ref={this.ProduceEditModalRef} editData={editData} reload={this.reload} />
        <CountEdit ref={this.CountEditRef} editData={countEditData} reload={this.reload}></CountEdit>
      </PageContainer>
    )
  }
}

export default ProductManage
