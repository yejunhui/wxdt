// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    toview:'',
    leftLists:[
      //{'imageurl':'','listName':'','id':''},
    ],
    rightLists:[
      //{'name':'','price':0,'num':0,'image':'','id':''},
  ],
    serverUrl:'',
    cny:0,
    //orderList:[{'name':'测试1','price':88,'num':0,'orPrice':0}],
    orderList:[],
    openid:null,
    ordernumber:null,
    colors:[],
    dis:null,
    mit:null
  },

  //获得商品列表
  getList:function(e){
    var that = this;
    wx.request({
      url:that.data.serverUrl+"/dataFile.jsp",
      data:{
        'shopname':'root'
      },
      success:function(res){
        console.log("res.data:");
        console.log(res.data);
        that.setData({
          leftLists:res.data.lists,
          rightLists:res.data.data,
        })
        wx.hideLoading({})
      },
    })
  },

  //锚点
  toView:function (e) {
    var t = e.currentTarget.dataset.t;
    console.log('点击了锚点:'+t);
    this.setData({
      toview:t,
      colors:{t:"white"}
    });
  },

  //减操作
  pyDel :function (e) {
    var name = e.currentTarget.dataset.name;
    console.log(name+'点了减操作');
    var lists = this.data.rightLists;
    var play= 0;
    var dis = 0;
    var mit = 0;
    var d=0;
    for (var i = 0, l = lists.length; i < l; i++){
      if(lists[i].num > 0){
        var val = lists[i].num-1;
      }
      else{
        var val = 0;
      }
      if(lists[i]['name'] == name){
        var key = "rightLists["+i+"].num";
          this.setData({
            [key]:val,
          });
      };

      if(lists[i].discounts>0){
        d = (1-lists[i].discounts)
      }else{
        d = 0
      }
      if((lists[i].price*lists[i].num)>=lists[i].satisfy){
          lists[i].dis=lists[i].price*lists[i].num*d,
          lists[i].mit=lists[i].mitigate*Math.floor((lists[i].price*lists[i].num)/lists[i].satisfy)
      }else{
        lists[i].dis=0
        lists[i].mit=0
      }
      //console.log("dis:"+lists[i].dis)
      //console.log("mit:"+lists[i].mit)
      play = play + lists[i].price*lists[i].num
      dis = dis+lists[i].dis
      mit = mit+lists[i].mit
      this.setData({
        'cny':play,
        'dis':dis,
        'mit':mit
      });
    };
  },

    //加操作
    pyAdd :function (e) {
      var name = e.currentTarget.dataset.name;
      console.log(name+'点了加操作');
      var lists = this.data.rightLists;
      var play = 0;
      var dis = 0;
      var mit = 0;
      var d = 0;
      for (var i = 0, l = lists.length; i < l; i++){
        var val = lists[i].num+1;
        if(lists[i]['name'] == name){
          var key = "rightLists["+i+"].num";
          this.setData({
            [key]:val,
          });
        };

        if(lists[i].discounts>0){
          d = (1-lists[i].discounts)
        }else{
          d = 0
        }
        if((lists[i].price*lists[i].num)>=lists[i].satisfy){
            lists[i].dis=lists[i].price*lists[i].num*d,
            lists[i].mit=lists[i].mitigate*Math.floor((lists[i].price*lists[i].num)/lists[i].satisfy)
        }else{
          lists[i].dis=0
          lists[i].mit=0
        }
        //console.log("dis:"+lists[i].dis)
        //console.log("mit:"+lists[i].mit)
        play = play + lists[i].price*lists[i].num
        dis = dis+lists[i].dis
        mit = mit+lists[i].mit
        this.setData({
          'cny':play,
          'dis':dis,
          'mit':mit
        });
      };
    },

  //跳转到支付
  bindViewPlay(){
    console.log('点击了支付页面,共计：'+(this.data.cny-this.data.dis-this.data.mit)+'元（CNY）')
    if(this.data.cny != 0){
      var that = this
      var lists = this.data.rightLists
      var app = getApp()
      for(var i=0,l = lists.length;i<l;i++){
        //console.log('num:'+lists[i].num)
        if(lists[i].num != 0){
          this.data.orderList.push({'name':lists[i].name,'price':lists[i].price,'num':lists[i].num,'orPrice':lists[i].price*lists[i].num,'dis':lists[i].dis,'mit':lists[i].mit})
        }
      }
      wx.showLoading({
        title: '飞速下单中...',
      })
      wx.request({
        url: that.data.serverUrl+"/addOrder.jsp",
        data:{
          'openid':that.data.openid,
          'play':that.data.cny,
          'jsonList':that.data.orderList,
          'shop':app.globalData.shop
        },
        success(res){
          console.log(res.data)
          that.setData({
            ordernumber:res.data.ordernumber
          })
          console.log(that.data.orderList)
          that.data.orderList=[]
          wx.hideLoading()
          wx.navigateTo({
            url: '../orderitem/orderitem?ordernumber='+that.data.ordernumber+"&state=等待支付",
          })
        }
      })
    }else{
      wx.showToast({
        icon:'none',
        title: '别闹，先点餐！'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    wx.showLoading({
      title: '菜单正在路上...',
      mask:'true'
    })
    //获取用户账号
    this.setData({
      serverUrl:app.globalData.ServerUrl,
      userInfo:app.globalData.userInfo,
      openid:app.globalData.openid
    })
    //设置标题
    wx.setNavigationBarTitle({
      title: '菜单',
    })
    //获得商品列表
    this.getList();
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