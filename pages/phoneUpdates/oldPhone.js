// pages/phoneUpdates/oldPhone.js

const app = getApp()
let fliter = require('../../utils/fliter.js')

//重写有拦截器的页面
Page(fliter.identityFilter({
  /**
   * 页面的初始数据
   */
  data: {
    localUser: {},
    verifyCode: '',
    isVerifyCode: true,
    currentTime: 61,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let localUser = wx.getStorageSync("localUserInfo");
    if (localUser) {
      console.log(localUser)
      this.setData({
        localUser: localUser
      })
    }
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
   * 发送验证码
   */
  getVerifyCode: function() {

    let local = this.data.localUser;
    console.log(local)
    let cardId = local.idCard;
    let phoneNum = local.phoneNum;
    console.log(cardId)
    console.log(phoneNum)

    this.startCountTime();
    app.http.sendShortCode(cardId, phoneNum)
      .then(res => {
        console.log(res)
        if (0 == res.resultCode) {
          wx.showToast({
            title: '验证码已发送',
          })
        } else {
          wx.showToast({
            title: '发送验证码失败',
            icon: 'none'
          })
          console.log("Faild to sendVerifyCode :" + res.resultDesc)
        }
      })
  },

  /**
   * 获取用户输入的验证码
   */
  inputVerifyCode: function(e) {
    let that = this;
    let verifyCode = e.detail.value;
    console.log(verifyCode)
    // that.setData({

    // })
  },

  /**输入验证码后自动校验 */
  checkVerifyCode: function(e) {
    let that = this;
    let verifyCode = e.detail.value;
    if (verifyCode.match(/^\d{6}$/)) {
      //此处至做最简单的验证码校验，即6位数字，未做比对。
      console.log("验证码匹配")
      that.setData({
        isVerifyCode: true,
        verifyCode: verifyCode
      })
    } else {
      console.log("验证码不匹配")
      that.setData({
        isVerifyCode: false
      })
    }
  },

  /**
   * 下一步
   */
  nextStep: function() {
    //校验验证码，如果不为空且校验码格式正确，发送请求到服务器确认
    console.log("click NextStep")
    let that = this;
    let verifyCode = that.data.verifyCode;
    console.log(verifyCode)
    if (verifyCode != '') {
      //正确返回之后，跳转至新手机号码界面
      console.log(verifyCode)
      let local = wx.getStorageSync("localUserInfo");
      console.log(local.idCard)

      app.http.checkCode(local.idCard, verifyCode)
        .then(res => {
          if (res.resultCode == 0 && res.data == 1) {
            console.log("通过验证跳转至下一步")
            wx.navigateTo({
              url: 'phoneUpdates',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          } else {
            wx.showToast({
              title: '验证失败，请稍候重试',
              icon: 'none'
            })
          }
        })
    }
  },

  /**
   * 倒计时开始
   */
  startCountTime: function() {
    console.log("开始倒计时")
    let that = this;
    let currentTime = that.data.currentTime;
    var interval = setInterval(function() {
      currentTime--;
      console.log("显示的时间：" + currentTime)
      that.setData({
        currentTime: currentTime
      })
      if (currentTime <= 0) {
        clearInterval(interval);
        that.setData({
          currentTime: 61
        })
      }
    }, 1000);
  },
}))

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     localUser:{},
//     verifyCode:'',
//     isVerifyCode:true,
//     currentTime: 61,
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     let localUser = wx.getStorageSync("localUserInfo");
//     if(localUser){
//       console.log(localUser)
//       this.setData({
//         localUser:localUser
//       })
//     }
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

// /**
//  * 发送验证码
//  */
//   getVerifyCode:function(){

//     let local = this.data.localUser;
//     console.log(local)
//     let cardId = local.idCard;
//     let phoneNum = local.phoneNum;
//     console.log(cardId)
//     console.log(phoneNum)

//     this.startCountTime();
//     app.http.sendShortCode(cardId, phoneNum)
//     .then(res => {
//       console.log(res)
//       if(0 == res.resultCode){
//         wx.showToast({
//           title: '验证码已发送',
//         })
//       }else{
//         wx.showToast({
//           title: '发送验证码失败',
//           icon:'none'
//         })
//         console.log("Faild to sendVerifyCode :" + res.resultDesc)
//       }
//     })
//   },

//   /**
//    * 获取用户输入的验证码
//    */
//   inputVerifyCode:function(e){
//     let that = this;
//     let verifyCode = e.detail.value;
//     console.log(verifyCode)
//     // that.setData({

//     // })
//   },

// /**输入验证码后自动校验 */
//   checkVerifyCode:function(e){
//     let that = this;
//     let verifyCode = e.detail.value;
//     if (verifyCode.match(/^\d{6}$/)){
//       //此处至做最简单的验证码校验，即6位数字，未做比对。
//       console.log("验证码匹配")
//       that.setData({
//         isVerifyCode:true,
//         verifyCode:verifyCode
//       })
//     }else{
//       console.log("验证码不匹配")
//       that.setData({
//         isVerifyCode: false
//       })
//     }
//   },

// /**
//  * 下一步
//  */
//   nextStep:function(){
// //校验验证码，如果不为空且校验码格式正确，发送请求到服务器确认
// console.log("click NextStep")
// let that = this;
// let verifyCode = that.data.verifyCode;
// console.log(verifyCode)
// if(verifyCode != ''){
// //正确返回之后，跳转至新手机号码界面
// console.log(verifyCode)
// let local = wx.getStorageSync("localUserInfo");
// console.log(local.idCard)

//   app.http.checkCode(local.idCard,verifyCode)
//   .then(res => {
//     if(res.resultCode == 0 && res.data == 1){
//       console.log("通过验证跳转至下一步")
//       wx.navigateTo({
//         url: 'phoneUpdates',
//         success: function (res) { },
//         fail: function (res) { },
//         complete: function (res) { },
//       })
//     }else{
//       wx.showToast({
//         title: '验证失败，请稍候重试',
//         icon: 'none'
//       })
//     }
//   })
// }
//   },

//   /**
//    * 倒计时开始
//    */
//   startCountTime: function () {
//     console.log("开始倒计时")
//     let that = this;
//     let currentTime = that.data.currentTime;
//     var interval = setInterval(function () {
//       currentTime--;
//       console.log("显示的时间：" + currentTime)
//       that.setData({
//         currentTime: currentTime
//       })
//       if (currentTime <= 0) {
//         clearInterval(interval);
//         that.setData({
//           currentTime: 61
//         })
//       }
//     }, 1000);
//   },


// })