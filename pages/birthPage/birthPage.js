var utils = require('../../utils/utils.js');
Page({
  data: {
      startDate: "0",
      endDate: "0",
      defaultDate: "0",
      userBirth: null
  },
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: "kUserBirth",
      success: function(res) {
        // 获取存储在本地的数据
        var localBirth = res.data;

        var today = new Date();
        var startDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

        that.setData({
          userBirth: localBirth,
          startDate: utils.formatDate(startDate),
          endDate: utils.formatDate(today),
          defaultDate: localBirth
        });
      },
      fail: function() {
        var today = new Date();
        var startDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
        var defaultDate = new Date(today.getFullYear() - 30, today.getMonth(), today.getDate());

        that.setData({
          startDate: utils.formatDate(startDate),
          endDate: utils.formatDate(today),
          defaultDate: utils.formatDate(defaultDate)
        });
      }
    });
  },
  onReady: function() {
    // Do something when page ready.
  },
  onShow: function() {
    // Do something when page show.
    // wx.setNavigationBarTitle = "第1页";
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down
  },
  onDateChange: function(e) {
       this.setData({
           userBirth: e.detail.value
       });
       wx.setStorage({
         key: "kUserBirth",
         data: this.data.userBirth
       });
  }
})