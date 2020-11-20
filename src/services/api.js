export default {
  list: '/list',

  /**
   * 客户部分接口
   */
  clientList: '/userInfo/findUserInfoPageForBack', // 客户列表
  addClient: '/userInfo/saveUserInfo', // 新增客户
  updateClient: '/userInfo/updateUserInfoById', // 更新客户
  contractList: '/order/findOrderInfoForServiceAndAgreement', //合同列表

  /**
   * 企业管理部分接口
   */
  allCompanyList: '/companyInfo/findCompanyListForSelect', // 所有的企业
  companyList: '/companyInfo/findCompanyInfoPageForBack', // 分页企业数据
  handleCompany: '/companyInfo/updateIsUsedById', // 启用停用企业
  addCompany: '/companyInfo/saveCompanyInfo', // 新增企业
  updateCompany: '/companyInfo/updateCompanyInfoById', // 更新企业信息
  reportList: '/report/findReportListByCompanyId', // 企业报表
  updateReport: '/report/updateReportValue', // 更新报表的钱

  /**
   * 商品分类接口
   */
  classifyList: '/goodsType/findGoodsTypePage', // 分类列表
  handleClassify: '/goodsType/updateIsSaleById', // 上架下架分类
  addClassify: '/goodsType/saveGoodsType', // 新增分类
  updateClassify: '/goodsType/updateGoodsType', // 更新分类
  deleteClassify: '/goodsType/deleteGoodsTypeById', // 删除分类

  classifySort: '/goodsType/updateBatchSort', // 商品分类排序

  firstClassifyList: '/goodsType/findFirstGoodsTypeList', // 一级分类列表

  /**
   * 商品部分接口
   */
  goodList: '/goodsInfo/findGoodsInfoPage', // 商品列表
  handleGood: '/goodsInfo/updateIsSaleById', // 上架下架商品

  deleteGood: '/goodsInfo/updateIsDeletedById', //删除商品
  countEdit: '/goodsInfo/updateSalesCountById', // 修改数量
  goodSort: '/goodsInfo/updateBatchSort', // 商品排序
  goodDetail: '/goodsInfo/findGoodsInfoDetail', // 商品详情

  addGood: '/goodsInfo/saveGoodsInfo', // 新增商品
  updateGood: '/goodsInfo/updateGoodsInfo', // 更新商品

  /**
   * 订单部分接口
   */
  orderList: '/order/findOrderInfoPage', // 订单列表
  handleOrderStatus: '/order/updateOrderStatusById', // 修改订单状态

  updateExpressInfo: '/order/updateCourierInfoById', // 快递信息
  updateServiceTime: '/order/updateServiceTermById', // 更新服务到期时间
  updateTotalPrice: '/order/updatePriceById', // 修改订单金额

  updateActivity: '/order/updateActivityByOrderId', // 商品活动

  /**
   * 簿记豆流水
   */
  beansList: '/point/findAllPointPage', // 簿记豆流水列表
  beansRecord: '/point/findAllPointPageByUserId', // 簿记豆变更
  addBeansRecord: '/point/savePointInfo', // 新增簿记豆变更

  /**
   * 上传
   */
  fileUpload: '/upload/uploadFile', // 上传
}
