// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    title:'',
    userInfo:[],//用户数据
    photos:[],
    newTime:'',//现在时刻，用于提醒客户时间段
    openid:null,
    ServerUrl:app.globalData.ServerUrl,
  },
  // 跳转到点餐页面
  bindViewTap() {
    console.log('调用了点餐系统');
    wx.navigateTo({
      url: '../order/order'
    })
  },
  //跳转会员卡
  bindViewCard(){
    console.log('调用了会员跳转');
    wx.navigateTo({
      url: '../card/card',
    })
  },
  //跳转订单
  bindViewOrder(){
    console.log('调用订单跳转');
    wx.navigateTo({
      url: '../orderList/orderList',
    })
  },
  //跳转卡包
  bindViewBag:function(){
    console.log('调用了卡包跳转');
    wx.navigateTo({
      url: '../bag/bag',
    })
  },

  onLoad() {
    console.log('跳转主页')
    var that = this
    var app = getApp();
    wx.showLoading({
      title: '小二正在赶来...',
      mask:true
    })
    wx.request({
      url: this.data.ServerUrl+"/indexList.jsp",
      data:{'shop':app.globalData.shop},
      success(res){
        console.log(res.data)
        app.globalData.disconuts=res.data.disconuts
        app.globalData.satisfy=res.data.satisfy
        app.globalData.mitigate=res.data.mitigate
        that.setData({
          photos:res.data.data,
        })
      }
    })
    //设置页面标题
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
    console.log("userInfo:")
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo:app.globalData.userInfo
    })
  },
  onShow(){
    wx.getSetting({
      success(res){
        console.log(res.authSetting)
        if(res.authSetting["scope.userInfo"]){
          console.log('授权成功')
        }else{
          console.log('授权失败')
          wx.navigateTo({
            url: '../sigup/sigup',
          })
        }
      },
    })
  },
  onReady(){
  }
})
