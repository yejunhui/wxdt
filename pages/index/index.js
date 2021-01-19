// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    title:'Dxxt',
    userInfo:[],//用户数据
    videoSrt:'',//主页视频路径，文件过大，要设置为网络文件
    newTime:'',//现在时刻，用于提醒客户时间段
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
    url:"../order/order"
  },
  bindViewOrder(){
    console.log('调用订单跳转');
  },
  bindViewBag:function(){
    console.log('调用了卡包跳转');
  },
  onLoad() {
    //设置页面标题
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
    //初始数据
    this.setData({
      button:"开始点餐",
      videoSrt:"http://www.w3school.com.cn/example/html5/mov_bbb.mp4"
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
