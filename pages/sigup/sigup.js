// pages/sigup/sigup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    openid:null,
    miniprogram:[],
    serverUrl:null,
  },

  //跳转主页
  bindViewIndex(){
    console.log('点击了授权')
    var that = this;
    var code = null;
    wx.showLoading({
      title: '加载中...',
    })
    wx.authorize({
      scope: 'scope.userInfo',
      success(){
        wx.login({
          success(res){
            code = res.code
            console.log("code:"+code)
            wx.request({
              url:that.data.serverUrl+ '/sigup.jsp',
              data:{
                'name':that.data.userInfo.nickName,
                'code':code,
              },
              success(res){
                console.log(res.data)
                that.setData({
                  openid:res.data.openid
                })
                wx.hideLoading()
              },
              fail(){
                console.log("调用网络失败...")
              }
            })
          }
        })
        wx.getUserInfo({
          success(res){
            that.setData({
              userInfo:res.userInfo
            })
          }
        })
      }
    })
    //跳转主页
    wx.navigateTo({
      url: '../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var app = getApp()
    this.data.serverUrl = app.globalData.ServerUrl
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