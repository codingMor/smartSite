// pages/evaluations/safeEvaluation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    listData: [{
        "id": "01",
        "name": "7月考评",
        "data": "2019-07-01",
        "project": "白云某项目工程",
        "status": "待考评"
      },
      {
        "id": "02",
        "name": "8月考评",
        "data": "2019-08-01",
        "project": "海珠某项目工程",
        "status": "待考评"
      },
      {
        "id": "03",
        "name": "9月考评",
        "data": "2019-09-01",
        "project": "天河某项目工程",
        "status": "待考评"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
   * 考评点击切换事件
   */
  swichNav: function(e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  /**
   * tab发生改变的事件
   */
  bindChange: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  /**
   * 点击进入考评事件
   */
  starEvaluation: function(e) {
    var selected = e.currentTarget.dataset.selected;
    console.log(selected.id)
    wx.showModal({
      title: '提示',
      content: '现在开始：'+selected.name,
      success: function(sm){
        if(sm.confirm){
          wx.navigateTo({
            url: "evaluations?id=" + selected.id + "&name=" + selected.name + "&data=" + selected.data + "&project=" + selected.project + "&status=" + selected.status,
          })
        }else if(sm.cancel){
        }
      }
    })
    //准备跳转页面
    // wx.navigateTo({
    //   url: "readyEvaluation?id=" + selected.id + "&name=" + selected.name + "&data=" + selected.data + "&project=" + selected.project + "&status=" + selected.status,
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  }
})