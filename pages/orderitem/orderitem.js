// pages/orderitem/orderitem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:null,
    ordernumber:null,
    orprice:null,
    itemList:[],
    state:null,
    disabled:true,
    serverUrl:null,
    play:null,
    dis:null,
    mit:null,
    playButton:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var app = getApp()
    var ordernumber = options.ordernumber
    var state = options.state
    var dis = 0
    var mit = 0

    if(state == '等待支付'){
      this.setData({
        disabled:true,
        play:'还需支付',
        playButton:'立即支付'
      })
    }else{
      this.setData({
        disabled:false,
        play:'已支付',
        playButton:'订单已关闭'
      })
    }

    wx.showLoading({
      title: '让我猜猜你是谁...',
      mask:'true'
    })
    this.setData({
      openid:app.globalData.openid,
      serverUrl:app.globalData.ServerUrl,
      state:state
    })
    console.log("订单号:"+ordernumber)
    wx.request({
      url: this.data.serverUrl+"/orderList.jsp",
      data:{'ordernumber':ordernumber,'openid':this.data.openid},
      success(res){
        console.log(res.data.list)
        that.setData({
          ordernumber:res.data.data[0].ordernumber,
          orprice:res.data.data[0].orprice,
          itemList:res.data.list
        })
        for(var i=0,l = that.data.itemList.length;i<l;i++){
          dis = dis+that.data.itemList[i].dis
          mit = mit+that.data.itemList[i].mit
        }
        that.setData({
          dis:dis,
          mit:mit
        })
        console.log("dis:"+that.data.dis)
        console.log("mit:"+that.data.mit)
        wx.hideLoading({})
      }
    })
    wx.setNavigationBarTitle({
      title: '',
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