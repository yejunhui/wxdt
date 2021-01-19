// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'Dxxt',
    userInfo:[],
    leftLists:[
      {'icon':'/image/home.png','name':'表项1'},
      {'icon':'/image/home.png','name':'表项2'},
      {'icon':'/image/home.png','name':'表项3'}
    ],
    rightLists:[
      {'name':'name1','price':16,'num':0,'image':''},
      {'name':'name2','price':10,'num':0,'image':''},
      {'name':'name3','price':1,'num':0,'image':''},
      {'name':'name4','price':10,'num':0,'image':''}
  ],
    userInfo_error:"",
    rightViewItemImage:'',
    rightViewItemImageList:[]
  },

  //跳转到主页
  bindViewIndex(){
    wx.navigateTo({
      url: '../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
    //先把this赋值给inThis，防止出错
    var inThis = this
    wx.getSetting({
      success(res){
        if(res.authSetting){
          console.log('成功授权')
          wx.getUserInfo({
            success (res) {
              //console.log(res.userInfo);
              inThis.setData({
                userInfo:res.userInfo,
              })
            }
          })
        }
        else{
          console.log(res.authSetting)
          this.setData({
            userInfo_error:"用户不同意授权！"
          })
          
        }
        
      }
    })
    this.setData({
      rightViewItemImage:"https://img-blog.csdnimg.cn/20190323161159133.png",
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
    wx.request({
      url: 'http://localhost:8080/dxxt/sigup.jsp?user=user',
    })

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