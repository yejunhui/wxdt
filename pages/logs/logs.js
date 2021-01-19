// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  buttonView () {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  onLoad() {
    this.setData({
      userInfo:app.globalData.userInfo,
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
