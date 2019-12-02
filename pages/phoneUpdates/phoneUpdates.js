// pages/phoneUpdates/phoneUpdates.js

const app = getApp()
let fliter = require('../../utils/fliter.js')

//重写有拦截器的页面
Page(fliter.identityFilter({
  /**
   * 页面的初始数据
   */
  data: {
    currentTime: 61,
    isPhone: true,
    newPhoneNum: '',
    verifyCode: '',
    isVerifyCode: true,
    isSubmit: true
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

  /**
   * 发送验证码
   */
  sendVerifyCode: function() {
    this.startCountTime();
    //发送验证码
    let local = wx.getStorageSync("localUserInfo");
    let idCard = local.idCard;
    console.log(idCard);
    let phoneNum = this.data.newPhoneNum;
    console.log("新的手机号码" + phoneNum)
    app.http.sendShortCode(idCard, phoneNum)
      .then(res => {
        if (0 == res.resultCode) {
          wx.showToast({
            title: '验证码已发送',
          })
        } else {
          wx.showToast({
            title: '验证码发送失败，请稍候重试',
            icon: 'none',
            duration: 1000
          })
        }
      })
  },
  /**
   * 检验是否合格手机号码
   */
  phoneNumCheck: function(e) {
    var that = this;
    console.log("开始验证手机号码")
    var phoneNum = e.detail.value;
    console.log("输入的手机号码：" + phoneNum)
    if (!(/^1[3456789]\d{9}$/.test(phoneNum))) {
      that.setData({
        isPhone: false
      })
    } else {
      that.setData({
        isPhone: true,
        newPhoneNum: phoneNum
      })
    }
  },

  /**
   * 获取用户输入的验证码
   */
  getInputVerifyCode: function(e) {
    let that = this;
    let verifyCode = e.detail.value;
    if (verifyCode.match(/^\d{6}$/)) {
      that.setData({
        verifyCode: verifyCode,
        isVerifyCode: true
      })
    } else {
      that.setData({
        isVerifyCode: false
      })
    }
  },

  /**
   * 提交修改手机号码
   */
  submitUpdatePhone: function() {
    let that = this;
    //关闭提交按钮，防止重复点击
    that.setData({
      isSubmit: false
    })

    let local = wx.getStorageSync("localUserInfo");
    let idCard = '';
    if (local) {
      idCard = local.idCard;
    }
    let phoneNum = that.data.newPhoneNum;
    let verifyCode = that.data.verifyCode;
    if (idCard != '' && phoneNum != '' && verifyCode != '') {
      //提交服务器修改手机号码
      app.http.updateUserPhone(idCard, phoneNum, verifyCode)
        .then(res => {
          if (0 == res.resultCode && res.data != null) {
            wx.showToast({
              title: '修改成功',
            })
            console.log("跳转至个人信息主页")
            wx.switchTab({
              url: '../userinfos/userinfos',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          } else {
            wx.showToast({
              title: '修改失败，请稍候重试',
              icon: 'none',
              duration: 1000
            })
          }
        })
    }
    that.setData({
      isSubmit: true
    })
  }
}))

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     currentTime: 61,
//     isPhone:true,
//     newPhoneNum:'',
//     verifyCode:'',
//     isVerifyCode: true,
//     isSubmit:true
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

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

//   /**
//  * 发送验证码
//  */
//   sendVerifyCode: function () {
//     this.startCountTime();
//     //发送验证码
//     let local = wx.getStorageSync("localUserInfo");
//     let idCard = local.idCard;
//     console.log(idCard);
//     let phoneNum = this.data.newPhoneNum;
//     console.log("新的手机号码"+ phoneNum)
//     app.http.sendShortCode(idCard,phoneNum)
//     .then(res => {
//       if(0 == res.resultCode){
//         wx.showToast({
//           title: '验证码已发送',
//         })
//       }else{
//         wx.showToast({
//           title: '验证码发送失败，请稍候重试',
//           icon:'none',
//           duration:1000
//         })
//       }
//     })
//   },
//   /**
//    * 检验是否合格手机号码
//    */
//   phoneNumCheck:function(e){
//     var that = this;
//     console.log("开始验证手机号码")
//     var phoneNum = e.detail.value;
//     console.log("输入的手机号码：" + phoneNum)
//     if (!(/^1[3456789]\d{9}$/.test(phoneNum))) {
//       that.setData({
//         isPhone: false
//       })
//     } else {
//       that.setData({
//         isPhone: true,
//         newPhoneNum: phoneNum
//       })
//     }
//   },

// /**
//  * 获取用户输入的验证码
//  */
//   getInputVerifyCode:function(e){
//     let that = this;
//     let verifyCode = e.detail.value;
//     if (verifyCode.match(/^\d{6}$/)){
//       that.setData({
//         verifyCode: verifyCode,
//         isVerifyCode: true
//       })
//     }else{
//       that.setData({
//         isVerifyCode:false
//       })
//     }
//   },

// /**
//  * 提交修改手机号码
//  */
//   submitUpdatePhone:function(){
//     let that = this;
//     //关闭提交按钮，防止重复点击
//     that.setData({
//       isSubmit:false
//     })

//     let local = wx.getStorageSync("localUserInfo");
//     let idCard ='';
//     if(local){
//       idCard = local.idCard;
//     }
//     let phoneNum = that.data.newPhoneNum;
//     let verifyCode = that.data.verifyCode;
//     if(idCard != '' && phoneNum != '' && verifyCode != ''){
//       //提交服务器修改手机号码
//       app.http.updateUserPhone(idCard, phoneNum, verifyCode)
//       .then(res => {
//         if(0 == res.resultCode && res.data != null){
//           wx.showToast({
//             title: '修改成功',
//           })
//           console.log("跳转至个人信息主页")
//          wx.switchTab({
//            url: '../userinfos/userinfos',
//            success: function(res) {},
//            fail: function(res) {},
//            complete: function(res) {},
//          })
//         }else{
//           wx.showToast({
//             title: '修改失败，请稍候重试',
//             icon:'none',
//             duration:1000
//           })
//         }
//       }) 
//     }
//     that.setData({
//       isSubmit:true
//     })
//   }
// })