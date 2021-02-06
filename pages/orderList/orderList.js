// pages/orderList/orderList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:null,
    serverUrl:null,
    orderList:[
      //{'ordernumber':'','createdate':'','state':'','orprice':0},
    ]
  },

  toOrder(e){
    var ordernumber = e.currentTarget.dataset.ordernumber
    var state = e.currentTarget.dataset.state
    console.log("点击了订单："+ordernumber)
    wx.navigateTo({
      url: '../orderitem/orderitem?ordernumber='+ordernumber+"&state="+state,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var app = getApp()
    wx.showLoading({
      title: '正在奔你而来...',
      mask:'true'
    })
    this.setData({
      serverUrl:app.globalData.ServerUrl,
      openid:app.globalData.openid
    })
    wx.request({
      url: this.data.serverUrl+"/orderList.jsp",
      data:{'openid':this.data.openid},
      success(res){
        console.log(res.data)
        that.setData({
          orderList:res.data.data
        })
        wx.hideLoading()
      }
    })
    wx.setNavigationBarTitle({
      title: '订单列表',
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