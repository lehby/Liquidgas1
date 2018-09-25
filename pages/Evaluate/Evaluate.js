// pages/Evaluate/Evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inpt: "",
    star: 0,
    star1: 0,
    star2: 0,
    starMap: [
      '非常差',
      '差',
      '一般',
      '好',
      '非常好',
    ],
  },

  myStarChoose(e) {
    let star = parseInt(e.target.dataset.star) || 0;
    this.setData({
      star: star,
    });
  },
  myStarChoose1(e) {
    let star1 = parseInt(e.target.dataset.star) || 0;
    this.setData({
      star1: star1,
    });
  },
  myStarChoose2(e) {
    let star2 = parseInt(e.target.dataset.star) || 0;
    this.setData({
      star2: star2,
    });
  },
  // 获取tetx里面的值
  changeOrderData: function(e) {
    let text = e.detail.value
    this.setData({
      inpt: text
    })
  },
  // 提交表单

  submission: function() {
    console.log(this.data.inpt)
    console.log(this.data.star)
    console.log(this.data.star1)
    console.log(this.data.star2)
    wx.switchTab({
      url: "/pages/HomePage/HomePage"
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})