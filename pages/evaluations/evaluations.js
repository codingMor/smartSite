// pages/evaluations/evaluations.js
var topticsIndex = 0;
/**
 * 考评题库
 */
var toptics = [{
  "toptic": "题目1",
  "answers": [{
    "id": "0",
    "answer": "答案1",
    "selected": false
  }, {
    "id": "1",
    "answer": "答案2",
    "selected": false
  }, {
    "id": "2",
    "answer": "答案3",
    "selected": false
  }, {
    "id": "3",
    "answer": "答案4"
  }]
}, {
  "toptic": "题目2",
  "answers": [{
    "id": "0",
    "answer": "答案1",
    "selected": false
  }, {
    "id": "1",
    "answer": "答案2",
    "selected": false
  }, {
    "id": "2",
    "answer": "答案3",
    "selected": false
  }, {
    "id": "3",
    "answer": "答案4",
    "selected": false
  }]
}, {
  "toptic": "题目3",
  "answers": [{
    "id": "0",
    "answer": "答案1",
    "selected": false
  }, {
    "id": "1",
    "answer": "答案2",
    "selected": false
  }, {
    "id": "2",
    "answer": "答案3",
    "selected": false
  }, {
    "id": "3",
    "answer": "答案4",
    "selected": false
  }]
}];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    submit: "交卷",
    pre: "上一题",
    next: "下一题",
    topticIndex: topticsIndex + 1,
    topticsLength: toptics.length,
    toptic: toptics[topticsIndex].toptic,
    answers: toptics[topticsIndex].answers,
    preDisabled: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log("题库" + toptics[0].toptic);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 上一题
   */
  btnPre: function() {
    var that = this;
    if (topticsIndex > 0) {
      topticsIndex -= 1;
      that.setData({
        topticIndex: topticsIndex + 1,
        preDisabled: topticsIndex > 0 ? false : true,
        toptic: toptics[topticsIndex].toptic,
        answers: toptics[topticsIndex].answers
      })
    }
  },
  /**
   * 下一题
   */
  btnNext: function() {
    var that = this
    console.log(topticsIndex)
    if (topticsIndex < toptics.length) {
      topticsIndex += 1;
      that.setData({
        next: "下一题",
        preDisabled: false,
        topticIndex: topticsIndex + 1,
        toptic: toptics[topticsIndex].toptic,
        answers: toptics[topticsIndex].answers
      })
    }
  },
  /**
   * 交卷
   */
  submitEvaluations: function() {
    wx.showModal({
      title: '确认',
      content: '是否现在提交',
      success: function(sm) {
        if (sm.confirm) {
          //确认提交
        } else if (sm.cancel) {
          //取消
        }
      }
    })
  },
  /**
   * 选择的答案
   */
  selectedAnswer: function(e) {
    //如果选中，则修改选中状态
    var selectedIndex = e.detail.value;
    console.log(toptics[topticsIndex].toptic + "选中的答案是" + selectedIndex);
    //设置选中的的答案选中选中状态为true;为避免当用户修改答案的造成选中状态重复，每次选中的时候，都先清空选中的    状态
    toptics[topticsIndex].answers.forEach(function(e){
      e.selected = '';
    })
    toptics[topticsIndex].answers[selectedIndex].selected = true;
    console.log("选中的答案序号：" + selectedIndex+"选中的题目"+toptics[topticsIndex].answers[selectedIndex].id)
    
  }
})