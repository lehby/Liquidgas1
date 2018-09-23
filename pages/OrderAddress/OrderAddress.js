const utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      '08:00-09:00',
      '09:00-10:00',
      '10:00-11:00',
      '11:00-12:00',
      '12:00-13:00',
      '13:00-14:00',
      '14:00-15:00',
      '15:00-16:00',
      '16:00-17:00',
      '17:00-18:00',
      '18:00-19:00',
      '19:00-20:00',
    ],//预定时间弹框
    array2:
      [
        '今天',
        '明天'
      ],
    index: 0,
    index2: 0,
    showModal: false,//控制地址弹框按钮
    isAddress: true,//控制地址隐藏显示
    showgoods: false,//控制商品弹框隐藏显示
    isgoods: false,//控制商品列表的显示隐藏
    isSupplier: true,//控制供应商隐藏显示
    showPayment: false,//控制支付弹框按钮
    showPaymentMethod: false,//控制支付方式弹框按钮
    goodslist: [
      {
        Name: "商品1",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "公斤",
      },
      {
        Name: "商品2",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "公斤",
      },
      {
        Name: "商品3",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "瓶",
      },
      {
        Name: "商品4",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "公斤",
      },
      {
        Name: "商品5",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "瓶",
      }
    ],
    goods: [],
    Quantity: 0,
    Price: 0,
    addpayment: { name: '在线支付', checked: false, imgs: "../../imgs/66_03.png", },
    radioItems: [//支付选择
      { name: '在线支付', checked: false, imgs: "../../imgs/66_03.png", },
      { name: '货到付款', checked: true, imgs: "../../imgs/66_06.png", },
    ],
    PaymentItems: [//支付方式选择
      { name: '微信零钱', checked: true },
      { name: '农业银行储蓄卡', checked: false },
      { name: '招商银行储蓄卡', checked: false },
      { name: '中国工商银行储蓄卡', checked: false },
    ],
    OptionsBox: [//瓶和公斤选择
      { name: '瓶', checked: true },
      { name: '公斤', checked: false }
    ],
    PaymentName: "",
    EnterpriseName: "",
    EnterprisePhone: "13000822230",
    EnterpriseAddress: "浙江省杭州市江千区浙江大学华家池校区西门对面3栋11楼402室",
    CustomerName: "",
    CustomerPhone: "15000822230",
    CustomerAddress: "浙江省杭州市江千区浙江大学华家池校区西门对面3栋11楼402室",
    commodityList: "",
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad() {
    this.getData()
    let AccountName = this.data.AccountName
    if (AccountName === "") {//判断地址是否有数据页面切换
      this.setData({
        isAddress: true,
      })
    } else {
      this.setData({
        isAddress: false,
      })
    }
    //判断供应商是否有数据页面切换
    let SupplierName = this.data.SupplierName
    if (SupplierName === "") {
      this.setData({
        isSupplier: true,
      })
    } else {
      this.setData({
        isSupplier: false,
      })
    }
  },
  //取出本地信息方法
  getData() {
    let this_ = this
    wx.getStorage({
      key: 'Information',
      success: function (res) {
        console.log(res.data)
        //判断用户选择的是瓶还是公斤
        let arr = []
        let OptionsBox = this_.data.OptionsBox
        if (OptionsBox[0].checked === true || OptionsBox[1].checked === false) {
          for (let i = 0; i < res.data[0].CustomerDetails.length; i++) {
            let obj = {
              Quantity: res.data[0].CustomerDetails[i].Quantity,
              Price: res.data[0].CustomerDetails[i].UnitPrice,
              ProductName: res.data[0].CustomerDetails[i].ProductName,
            }
            arr.push(obj)
          }
          this_.setData({
            commodityList: arr
          })
        } else if (OptionsBox[1].checked === true || OptionsBox[0].checked === false) {
          for (let i = 0; i < res.data[0].CustomerDetails.length; i++) {
            let obj = {
              Quantity: res.data[0].CustomerDetails[i].Quantity,
              Price: res.data[0].CustomerDetails[i].KilogramPrice,
              ProductName: res.data[0].CustomerDetails[i].ProductName,
            }
            arr.push(obj)
          }
          this_.setData({
            commodityList: arr
          })
        }
        this_.setData({
          CustomerName: utils.Decrypt(res.data[0].CustomerName),
          CustomerPhone: utils.Decrypt(res.data[0].CustomerPhone),
          CustomerAddress: utils.Decrypt(res.data[0].CustomerAddress),
          EnterpriseName: res.data[0].EnterpriseName,
          EnterprisePhone: res.data[0].EnterprisePhone[0],
          EnterpriseAddress: res.data[0].EnterpriseAddress,
        })
      },
    })
  },
  //瓶和公斤选项框点击事件
  OptionsBox: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.OptionsBox.length; i++) {
      if (checked.indexOf(this.data.OptionsBox[i].name) !== -1) {
        changed['OptionsBox[' + i + '].checked'] = true
      } else {
        changed['OptionsBox[' + i + '].checked'] = false
      }
    }
    console.log(changed)
    this.setData(changed)
    this.getData()
  },
  //供应商点击跳转供应商列表
  SupplierAdd() {
    wx.navigateTo({
      url: "/pages/SupplierRecommend/SupplierRecommend",
    })
  },

  //确定支付点击事件
  ConfirmSuccess() {
    console.log(this.data)
    // wx.switchTab({
    //   url: "/pages/Order/Order",
    // })
  },

  /**
     * 支付方式弹出框蒙层截断touchmove事件
     */
  preventTouchMove: function () {
  },
  /**
   * 支付方式隐藏模态对话框
   */
  PaymentMethodhideModal: function () {
    this.setData({
      showPaymentMethod: false
    });
  },
  /**
   * 支付方式对话框取消按钮点击事件
   */
  PaymentMethodCancel: function () {
    this.PaymentMethodhideModal();
  },
  /**
   * 支付方式对话框确认按钮点击事件
   */
  PaymentMethodConfirm: function (e) {
    this.PaymentMethodhideModal();
  },

  //支付方式选项框点击事件
  PaymentChange(e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.PaymentItems.length; i++) {
      if (checked.indexOf(this.data.PaymentItems[i].name) !== -1) {
        changed['PaymentItems[' + i + '].checked'] = true
      } else {
        changed['PaymentItems[' + i + '].checked'] = false
      }
    }
    console.log(changed)
    this.setData(changed)
  },
  //支付选项框点击事件
  radioChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    console.log(changed)
    this.setData(changed)
  },
  /**
   * 支付弹出框点击事件事件
   */
  goodsPayment() {
    this.setData({
      showPayment: true
    });
  },
  /**
   * 支付弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 支付隐藏模态对话框
   */
  PaymenthideModal: function () {
    this.setData({
      showPayment: false
    });
  },
  /**
   * 支付对话框取消按钮点击事件
   */
  PaymentCancel: function () {
    this.PaymenthideModal();
  },
  /**
   * 支付对话框确认按钮点击事件
   */
  PaymentConfirm: function (e) {
    for (let i = 0; i < this.data.radioItems.length; i++) {
      if (this.data.radioItems[i].checked === true) {
        this.setData({
          PaymentName: this.data.radioItems[i].name
        })
        if (this.data.radioItems[i].name === "在线支付") {
          this.setData({
            showPaymentMethod: true
          });
        }
      }
    }
    this.PaymenthideModal();
  },



  /**
   * 商品弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 商品隐藏模态对话框
   */
  goodsHideModal: function () {
    this.setData({
      showgoods: false
    });
  },
  /**
   * 商品对话框取消按钮点击事件
   */
  goodsCancel: function () {
    this.goodsHideModal();
  },
  /**
   * 商品对话框确认按钮点击事件
   */
  goodsConfirm: function () {
    let commodityList = this.data.commodityList;
    let goods = [];
    for (let i = 0; i < commodityList.length; i++) {
      if (commodityList[i].Quantity > 0) {
        goods.push(commodityList[i])
      }
    }
    let radio = this.data.radioItems;
    console.log(radio.length)
    let OptionsBox = this.data.OptionsBox
    let addpayment = this.data.addpayment
    if (OptionsBox[1].checked === true && OptionsBox[0].checked === false) {
      for (let i = 0; i < commodityList.length; i++) {
        if (commodityList[i].Quantity > 0 ) {
          radio.splice(0, 1);
          this.setData({
            radioItems: radio,
          })
        }
      }
    }
    else if (OptionsBox[0].checked === true && OptionsBox[1].checked === false) {
      if (radio.length == 1) {
        radio.unshift(addpayment);
        this.setData({
          radioItems: radio,
        })
      }
    }
    this.setData({
      isgoods: true,
      goods: goods
    })
    this.goodsHideModal();
  },
  /**
   * 商品点击显示弹框
   */
  goodsDisplay() {
    this.setData({
      showgoods: true,
    })
  },
  /**
  * 用户点击商品减1
  */
  subtracttap: function (e) {
    const index = e.target.dataset.index;
    const commodityList = this.data.commodityList;
    const Quantity = commodityList[index].Quantity;
    if (Quantity <= 0) {
      return;
    } else {
      commodityList[index].Quantity--;
      this.setData({
        commodityList: commodityList
      });
    }
    this.calculateTotal();
  },
  /**
    * 用户点击商品加1
    */
  addtap: function (e) {
    const index = e.target.dataset.index;
    const commodityList = this.data.commodityList;
    const Quantity = commodityList[index].Quantity;
    commodityList[index].Quantity++;
    this.setData({
      commodityList: commodityList
    });
    this.calculateTotal();
  },
  /**
  * 计算商品总数
  */
  calculateTotal: function () {
    let commodityList = this.data.commodityList;
    let Count = 0;
    let Price = 0;
    let OptionsBox = this.data.OptionsBox
    if (OptionsBox[0].checked === true || OptionsBox[1].checked === false) {//瓶
      for (let i = 0; i < commodityList.length; i++) {
        let good = commodityList[i];
        Count += parseInt(good.Quantity);
        Price += good.Quantity * good.Price;
      }
      this.setData({
        Quantity: Count,
        Price: Price
      })
    } else {//公斤
      for (let i = 0; i < commodityList.length; i++) {
        let good = commodityList[i];
        Count += parseInt(good.Quantity);
        Price += good.Quantity * good.Price;
      }
      this.setData({
        Quantity: Count,
        Price: 0
      })
    }
  },
  //预约时间Picker索引值
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //预约那天Picker索引值
  bindDayPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },


  /**
   * 地址弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 地址隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 地址对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },

  userName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  userPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  userAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },
  /**
   * 地址对话框确认按钮点击事件
   */
  onConfirm: function (e) {
    //地址判断
    let name = this.data.name
    if (name === "") {
      this.setData({
        isAddress: true,
      })
    } else {
      this.setData({
        isAddress: false,
      })
    }
    this.hideModal();

  },
  /**
   * 地址无数据隐藏页面弹框
   */
  Add() {
    this.setData({
      showModal: true,
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.calculateTotal();
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})