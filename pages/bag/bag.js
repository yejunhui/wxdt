// pages/bag/bag.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    openid:null,
    cardList:null,
    serverUrl:null,
  },
  toOrder(){
    wx.navigateTo({
      url: '../order/order',
    })
  },
  //获取列表
  getList:function(){
    var app = getApp()
    var that = this
    wx.request({
      url: this.data.serverUrl+"/cardList.jsp",
      data:{'shop':app.globalData.shop,'openid':this.data.openid},
      success(res){
        console.log(res.data)
        that.setData({
          cardList:res.data.data
        })
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    var that = this
    wx.showLoading({
      title: '看看都有什么...',
      mask:'true'
    })
    this.setData({
      openid:app.globalData.openid,
      userInfo:app.globalData.userInfo,
      serverUrl:app.globalData.ServerUrl
    })
    this.getList()
    wx.setNavigationBarTitle({
      title: '我的卡包',
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