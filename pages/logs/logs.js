//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    behaviors: [{ thing: 1, score: 0 }, { thing: 2, score: 0 }, { thing: 3, score: 0 }, { thing: 4, score: 0 }, { thing: 5, score: 0 }],
    things: ['早餐', '中餐', '晚餐', '睡觉', '看书'],
    card_class: [{ score_class: 'undo', icon_type: 'waiting', desc: '未做' }, { score_class: 'ordinary', icon_type: 'info', desc: '一般' }, { score_class: 'good', icon_type: 'success', desc: '很好' }, { score_class: 'unsatisfied', icon_type: 'warn', desc: '差' }]
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
    console.log(behaviors[index].score);
    this.setData({ behaviors : behaviors});
  },
  submitBevavior:function(e){
    var index = e.mark.index;
    var behaviors = this.data.behaviors;
    console.log("submit success!",behaviors[index]);
    wx.setStorageSync('behaviors', this.data.behaviors);
    wx.showToast({
      title: this.data.things[behaviors[index].thing-1] + '表现' + this.data.card_class[behaviors[index].score].desc,
      icon: 'success',
      duration: 2000
    })
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      }),
      behaviors: wx.getStorageSync('behaviors') || [{ thing: 1, score: 0 }, { thing: 2, score: 0 }, { thing: 3, score: 0 }, { thing: 4, score: 0 }, { thing: 5, score: 0 }],
      things: ['早餐', '中餐', '晚餐', '睡觉', '看书'],
      card_class: [{ score_class: 'undo', icon_type: 'waiting', desc: '未做' }, { score_class: 'ordinary', icon_type: 'info', desc: '一般' }, { score_class: 'good', icon_type: 'success', desc: '很好' }, { score_class: 'unsatisfied', icon_type: 'warn', desc: '差' }]
    })
  }
})
