// pages/card.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qc_code:[],
    openid:null,
    serverUrl:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var that = this
    wx.showLoading({
      title: '土豪，请稍等...',
    })
    this.setData({
      openid:app.globalData.openid,
      serverUrl:app.globalData.ServerUrl
    })
    wx.request({
      url: this.data.serverUrl+"/member.jsp",
      data:{'openid':that.data.openid},
      success(res){
        console.log(res.data)
        that.setData({
          qc_code:res.data
        })
        wx.hideLoading({})
      }
    })
    console.log(this.data.openid)
    console.log(this.data.serverUrl)
    console.log(this.data.qc_code)
    wx.setNavigationBarTitle({
      title: '我的会员',
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