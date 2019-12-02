// pages/userinfos/userinfos.js

const app = getApp()
let fliter = require('../../utils/fliter.js')

//重写有拦截器的页面
Page(fliter.identityFilter({
  /**
   * 页面的初始数据
   */
  data: {
    user: {
      cardId: '',
      phoneNum: ''
    },
    isHidenCard: true,
    vrCardId: '******************'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let local = wx.getStorageSync("localUserInfo");
    let cardId = local.idCard;
    let vrCardId = cardId.replace(cardId.substring(3, cardId.length - 3), "************");
    console.log(vrCardId)

    let phoneNum = local.phoneNum;
    that.setData({
      user: {
        cardId: cardId,
        phoneNum: phoneNum
      },
      vrCardId: vrCardId
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
   * 修改用户手机号码
   */
  updatePhoneNum: function() {
    console.log("修改手机号码")
    wx.navigateTo({
      url: '../phoneUpdates/oldPhone',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 是否显示身份证
   */
  showCard: function() {
    let that = this;
    let isShow = that.data.isHidenCard;
    console.log(isShow)
    isShow = !isShow;
    console.log(isShow)
    that.setData({
      isHidenCard: isShow
    })
  }
}))
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     user : {
//       cardId:'',
//       phoneNum:''
//     },
//     isHidenCard:true,
//     vrCardId:'******************'
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     let that = this;
//     let local = wx.getStorageSync("localUserInfo");
//     let cardId = local.idCard;
//     let vrCardId = cardId.replace(cardId.substring(3,cardId.length-3),"************");
//     console.log(vrCardId)

//     let phoneNum = local.phoneNum;
//     that.setData({
//       user: {
//         cardId: cardId,
//         phoneNum: phoneNum
//       },
//       vrCardId: vrCardId
//     })
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   },
//   /**
//    * 修改用户手机号码
//    */
//   updatePhoneNum : function(){
//     console.log("修改手机号码")
//     wx.navigateTo({
//       url: '../phoneUpdates/oldPhone',
//       success: function(res) {},
//       fail: function(res) {},
//       complete: function(res) {},
//     })
//   },

//   /**
//    * 是否显示身份证
//    */
//   showCard:function(){
//     let that = this;
//     let isShow = that.data.isHidenCard;
//     console.log(isShow)
//     isShow = !isShow;
//     console.log(isShow)
//     that.setData({
//       isHidenCard:isShow
//     })
//   }
// })