//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello orange!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logs:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShareAppMessage: function (res) {
    // return eventHandler接收到的分享参数
    return {
      title: '快来看看我们家小可爱吧',
      path: 'pages/index/index'
    };
  },
  onShow: function () {
    this.animation = wx.createAnimation();
    var that = this;
    that.animation.rotate(Math.random() * 720 - 360).step();
    setTimeout(function (e) {
      console.log(that);
      that.animation.scale(Math.random() * 2).step();
      that.setData({ animation: that.animation.export() });
      wx.navigateTo({
        url: '../logs/logs'
      })
    }, 1000);
  },
  onLoad: function () {
    this.setData({
      logs: app.globalData.logs
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
