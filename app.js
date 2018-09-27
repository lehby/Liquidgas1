//app.js
App({
 
  onLaunch: function () {
    var that = this;
    wx.login({
      success: res => {
        wx.request({
          url: that.globalData.wx_url_1 + res.code + that.globalData.wx_url_2,
          success: res => {
            that.globalData.openid = res.data.openid;
          }
        })
      }
    });
  },
  globalData: {
    baseUrl: "http://192.168.0.66:2599",
    CustomerId:"",
    Customer:"",
    CustomerList:null,
    Orderaddress: { Contact: "", Phone: "", Address: "", Longitude: "", Latitude:""},
  }
})