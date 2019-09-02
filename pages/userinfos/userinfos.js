// pages/userinfos/userinfos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user : {
      "userName": "moumou",
      "cardId": "431234567890000000",
      "phoneNum": "13812345678"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  /**
   * 修改用户手机号码
   */
  updatePhoneNum : function(){
    console.log("修改手机号码")
    wx.navigateTo({
      url: '../phoneUpdates/phoneUpdates',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})