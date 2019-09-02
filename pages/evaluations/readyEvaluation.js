// pages/evaluations/readyEvaluation.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    secleted: {
      "id": "",
      "name": "",
      "data": "",
      "project": "",
      "status": ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      secleted: {
        "id": options.id,
        "name": options.name,
        "data": options.data,
        "project": options.project,
        "status": options.status
      }
    })
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
   * 返回
   */
  btnBack: function() {
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 进入考评
   */
  btnStart: function() {
    //这里要带参数跳转到考试页面，参数为题库，或者将题库缓存在本地
    wx.navigateTo({
      url: 'evaluations',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})