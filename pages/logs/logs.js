//logs.js
const util = require('../../utils/util.js')
const timeout= 14400000;
const behavior_key = 'behavior';
const time_out_behavior_key = 'behavior_time_out';
const things = ['早餐', '中餐', '晚餐', '睡觉', '看书', '乐高', '画画', '跑步'];
const card_class = [{ score_class: 'undo', icon_type: 'waiting', desc: '未做' }, { score_class: 'ordinary', icon_type: 'info', desc: '一般' }, { score_class: 'good', icon_type: 'success', desc: '很好' }, { score_class: 'unsatisfied', icon_type: 'warn', desc: '差' }];
const default_behavior = [{ thing: 1, score: 0 }, { thing: 2, score: 0 }, { thing: 3, score: 0 }, { thing: 4, score: 0 }, { thing: 5, score: 0 }, { thing: 6, score: 0 }, { thing: 7, score: 0 }, { thing: 8, score: 0 }, { thing: 1, score: 0 }, { thing: 2, score: 0 }, { thing: 3, score: 0 }, { thing: 4, score: 0 }, { thing: 5, score: 0 }, { thing: 6, score: 0 }, { thing: 7, score: 0 }, { thing: 8, score: 0 }];

Page({
  data: {
    logs: [],
    behaviors: [],
    things: [],
    card_class: []
  },
  //事件处理函数
  bindThingTap: function (e) {
    var index = e.mark.index;
    var behaviors = this.data.behaviors;
    var score = behaviors[index].score || 0;
    if (score >= this.data.card_class.length-1){
      score = -1;
    }
    behaviors[index].score = score + 1;
    behaviors[index].animation = 'running';
    console.log(behaviors[index].score);
    this.setData({ behaviors : behaviors});

    var that =  this;
    setTimeout(function(e){
      that.data.behaviors[index].animation = 'paused';
      that.setData({ behaviors: that.data.behaviors });
    },2000)
  },
  submitBevavior:function(e){
    var index = e.mark.index;
    var behaviors = this.data.behaviors;
    console.log("submit success!",behaviors[index]);
    var timestamp = Date.parse(new Date());
    var expiration = timestamp + timeout ;
    wx.setStorageSync(time_out_behavior_key, expiration);
    wx.setStorageSync(behavior_key, this.data.behaviors);
    wx.showToast({
      title: this.data.things[behaviors[index].thing-1] + '表现' + this.data.card_class[behaviors[index].score].desc,
      icon: 'success',
      duration: 2000
    })
  },
  onLoad: function () {
    var expire_time = wx.getStorageSync(time_out_behavior_key);
    if(expire_time && expire_time){
      var timenow = Date.parse(new Date());
      if(timenow > expire_time){
        wx.removeStorageSync(behavior_key);
        wx.removeStorageSync(time_out_behavior_key);
      }
    }
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      }),
      behaviors: wx.getStorageSync(behavior_key) || default_behavior,
      things : things,
      card_class: card_class
    })
  },
  onShareAppMessage: function (res) {
    // return eventHandler接收到的分享参数
    return {
      title: '快来看看我们家小可爱吧',
      path: 'pages/index/index'
    };
  }
})
