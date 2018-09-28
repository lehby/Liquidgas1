let app = getApp()
var util = require('../../utils/util.js');
const baseUrl = app.globalData.baseUrl
// 获取维修订单
const baseUrls = `${baseUrl}/Api/RepairOrders/GetRepairOrders`
// 取消订单接口
const cancel = `${baseUrl}/Api/RepairOrders/RepairOrderCancel`
// 确认订单
const Confirm = `${baseUrl}/Api/RepairOrders/RepairOrderConfirm`

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ShowModal: false, //弹框按钮操控
    navbar: ['全部订单', '待维修', '维修完成', '已取消'],
    currentTab: 0,
    text2: "#2269d4",
    text3: "确认完成",
    // 取消原因
    getdata: "",
    // 取消订单id
    ID: "",
    // 唯一订单编号
    Serialnumber: "",
    // 携带参数
    parameter: {
      // 页码
      pageIndex: "1",
      // 反回条数
      pageSize: "3",
      // 查询关键字
      queryKeyword: "",
      // 状态列表
      status: "-1",
      // id
      customerId: "",

    },
    // 全部列表
    whole: [],
    // 待维修
    UntreatedList: [],
    // 维修完成
    ProcessedList: [],
    // 取消
    EvaluateList: []


  },
  //页面导航
  navbarTap(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    let currentTab=this.data.currentTab
    if(currentTab=0){//用户点击维修全部订单页面
      this.getmaintenance()
    }else if(currentTab=1){//用户点击配送中页面
      this.UntreatedList()
    }else if(currentTab=2){//用户点击维修完成页面
      this.ProcessedList()
    }else{//用户点击取消订单页面
      this.EvaluateList()
    }
  },
  // 搜索
  queryInput: function (e) {
    let text = e.detail.value
    this.setData({
      queryKeyword: text
    })
    this.getmaintenance()
    this.UntreatedList()
    this.ProcessedList()
    this.EvaluateList()
  },
  //输入框清空事件
  Delete() {
    this.setData({
      queryKeyword: ""
    })
    this.getmaintenance()
    this.UntreatedList()
    this.ProcessedList()
    this.EvaluateList()

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getID()
  },
  // 获取本地id
  getID() {
    this.setData({
      "parameter.CustomerId": app.globalData.Customer.CustomerId
    })
  },
  //确认完成点击事件
  onconfirm() {
    wx.showToast({
      title: '确认成功',
      icon: 'success',
      duration: 2000
    })
  },
  //全部页面详情
  queryBtn(e) {
    let orderId = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: '/pages/RepairDetailsComplete/RepairDetailsComplete?orderId=' + orderId,
    })
  },
  //待评价详情
  onEvaluate() {
    wx.navigateTo({
      url: '/pages/RepairDetailsComplete/RepairDetailsComplete',
    })
  },

  // 评价跳转页面
  Evaluate: function () {
    wx.navigateTo({
      url: '/pages/Evaluate/Evaluate',
    })
  },
  // 获取维修全部订单列表
  getmaintenance: function () {
    let _this = this
    let parameterlist = _this.data.parameter
    let pageIndexs = parameterlist.pageIndex
    let pageSizes = parameterlist.pageSize
    let queryKeywords = parameterlist.queryKeyword
    let customerId = parameterlist.customerId
    let statuss = parameterlist.status
    wx.request({
      url: baseUrls,
      data: {
        Sign: "",
        CustomerId: customerId,
        pageIndex: pageIndexs,
        pageSize: pageSizes,
        queryKeyword: queryKeywords,
        status: statuss,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        let orderData = res.data.Data
        console.log(orderData)
        _this.setData({
          whole: orderData
        })
      },
    })
  },
  // 调用配送中定单
  UntreatedList: function () {
    let _this = this
    let parameterlist = _this.data.parameter
    let pageIndexs = parameterlist.pageIndex
    let pageSizes = parameterlist.pageSize
    let queryKeywords = parameterlist.queryKeyword
    let customerId = parameterlist.customerId
    wx.request({
      url: baseUrls,
      data: {
        Sign: "",
        CustomerId: customerId,
        pageIndex: pageIndexs,
        pageSize: pageSizes,
        queryKeyword: queryKeywords,
        status: 10,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        let orderData = res.data.Data
        _this.setData({
          UntreatedList: orderData
        })
      },
    })
  },
  // 维修完成订单
  ProcessedList: function () {
    let _this = this
    let parameterlist = _this.data.parameter
    let pageIndexs = parameterlist.pageIndex
    let pageSizes = parameterlist.pageSize
    let queryKeywords = parameterlist.queryKeyword
    let customerId = parameterlist.customerId
    wx.request({
      url: baseUrls,
      data: {
        Sign: "",
        CustomerId: customerId,
        pageIndex: pageIndexs,
        pageSize: pageSizes,
        queryKeyword: queryKeywords,
        status: 30,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        let orderData = res.data.Data
        _this.setData({
          ProcessedList: orderData
        })
      },
    })
  },
  // 取消订单
  EvaluateList: function () {
    let _this = this
    let parameterlist = _this.data.parameter
    let pageIndexs = parameterlist.pageIndex
    let pageSizes = parameterlist.pageSize
    let queryKeywords = parameterlist.queryKeyword
    let customerId = parameterlist.customerId
    wx.request({
      url: baseUrls,
      data: {
        Sign: "",
        CustomerId: customerId,
        pageIndex: pageIndexs,
        pageSize: pageSizes,
        queryKeyword: queryKeywords,
        status: 100,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        let orderData = res.data.Data
        _this.setData({
          EvaluateList: orderData
        })
      },
    })
  },

  // 获取取消原因
  getdata: function (e) {
    let _this = this
    let getdatas = e.detail.value
    _this.setData({
      getdata: getdatas
    })
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function (e) {
    let _this = this
    // 订单
    let tomerId = _this.data.Serialnumber
    // 用户
    let orderId = _this.data.ID
    // 取消订单说明orderId
    let Explain = _this.data.getdata
    if (Explain !== "") {
      wx.request({
        url: cancel,
        data: {
          Sign: "",
          OrderId: orderId,
          CustomerId: tomerId,
          Explain: Explain
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          if (res.data.Data) {
            wx.showToast({
              title: "提交成功",
              duration: 1000
            });
            _this.getmaintenance()
            _this.UntreatedList()
            _this.EvaluateList()
          } else {
            util.showError("提交有误请从新提交")
            return false
          }
        },
      })
    } else {
      wx.showToast({
        title: "请填写取消原因",
        duration: 1000
      });
    }
    // 隐藏弹框
    _this.HideModal()
  },
  /**
   * 显示输入狂取消按键
   */
  phoneList(e) {
    let _this = this
    let id = e.target.dataset.orderid
    let orderID = e.target.dataset.serial
    _this.setData({
      ShowModal: true,
      ID: id,
      Serialnumber: orderID
    })
  },


  /**
   * 隐藏模态对话框
   */
  HideModal: function () {
    this.setData({
      ShowModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.HideModal();
  },


  // 确认订单
  Confirm: function (e) {
    let Orderid = e.currentTarget.dataset.orderid
    let Customerid = e.currentTarget.dataset.serial
    let this_=this
    wx.request({
      url: Confirm,
      data: {
        Sign: "",
        OrderId: Orderid,
        CustomerId: Customerid,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        this_.getmaintenance()
        this_.ProcessedList()
        this_.UntreatedList()
        console.log(res)
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let _this = this
    _this.getmaintenance()
    _this.UntreatedList()
    _this.ProcessedList()
    _this.EvaluateList()
    wx.showToast({
      title: "加载中",
      icon: 'loading',
      duration: 1000
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let _this = this
    let a = 2
    let page = _this.data.parameter.pageIndex
    let Size = _this.data.parameter.pageSize
    let Size1 = Number(Size)
    page++
    let Sizes = Size1 + a
    _this.setData({
      "parameter.pageIndex": page,
      "parameter.pageSize": Sizes
    })
    _this.getmaintenance()
    _this.UntreatedList()
    _this.ProcessedList()
    _this.EvaluateList()
    wx.showToast({
      title: "加载中",
      icon: 'loading',
      duration: 1000
    });

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})