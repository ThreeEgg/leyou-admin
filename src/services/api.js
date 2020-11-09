export default {
  list: '/list',

  /**
   * 客户部分接口
   */
  clientList:'/userInfo/findUserInfoPageForBack', // 客户列表
  addClient:'/userInfo/saveUserInfo', // 新增客户
  updateClient:'/userInfo/updateUserInfoById', // 更新客户

  /**
   * 企业管理部分接口
   */
  allCompanyList:'/companyInfo/findCompanyListForSelect', // 所有的企业
  companyList:'/companyInfo/findCompanyInfoPageForBack', // 分页企业数据
  handleCompany:'/companyInfo/updateIsUsedById', // 启用停用企业
  addCompany:'/companyInfo/saveCompanyInfo', // 新增企业
  updateCompany:'/companyInfo/updateCompanyInfoById', // 更新企业信息

  /**
   * 商品分类接口
   */
  classifyList:'/goodsType/findGoodsTypePage', // 分类列表
  handleClassify:'/goodsType/updateIsSaleById', // 上架下架分类
  addClassify:'/goodsType/saveGoodsType', // 新增分类
  updateClassify:'/goodsType/updateGoodsType', // 更新分类
  deleteClassify:'/goodsType/deleteGoodsTypeById', // 删除分类
}
