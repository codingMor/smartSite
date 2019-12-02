// pages/regs/regs.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // user: {
    //   "cardId": "",
    //   "phoneNum": ""
    // },
    cardId: '',
    phoneNum: '',
    isCard: true,
    isCheckNum: true,
    isPhone: true,
    currentTime: 61,
    loginLock: false,
    verifyCode: ''
  },

  getVerifyCode: function(e) {
    this.setData({
      verifyCode: e.detail.value
    })
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
   * 手机号码验证
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
        phoneNum: phoneNum
      })
    }
  },
  /**
   * 输入身份证号码后验证
   */
  idcardCheck: function(e) {
    var that = this;
    console.log("输入完毕后开始验证身份证号码")
    var cardId = e.detail.value;
    console.log("输入的身份证号码是：" + cardId);
    console.log(that.checkCode(cardId));
    that.setData({
      isCard: that.checkCode(cardId),
      cardId: cardId
    })
  },

  checkCode: function(cardId) {
    var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    var code = cardId.substring(17);
    if (p.test(cardId)) {
      var sum = 0;
      for (var i = 0; i < 17; i++) {
        sum += cardId[i] * factor[i];
      }
      if (parity[sum % 11] == code.toUpperCase()) {
        return true;
      }
    }
    return false;
  },

  /**
   * 获取短信验证码
   */
  sendVerifyCode: function() {
    console.log("获取验证码")
    var that = this;
    //当手机号码不为空的时候开始倒计时，并开始发送
    if (that.data.cardId != null && that.data.cardId != '' && that.data.phoneNum != null && that.data.phoneNum != '') {
      console.log(that.data.cardId + "," + that.data.phoneNum)
      that.startCountTime();
      app.http.sendShortCode(that.data.cardId, that.data.phoneNum).then(res => {
        console.log(res)
        if (res.resultCode != 0 || res.data == '-404') {
          wx.showToast({
            title: '身份验证有误',
            icon:none
          })
        } else {
          wx.showToast({
            title: '验证码已发送',
          })
          console.log(res.data)
          // that.setData({

          // })
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

  /**
   * 提交验证身份并登录
   */
  firstLogin: function() {
    let that = this;
    let cardId = that.data.cardId;
    let phoneNum = that.data.phoneNum;
    let verifyCode = that.data.verifyCode;
    console.log('verifyCode:' + verifyCode)
    if (cardId == null || cardId == '') {
      wx.showToast({
        title: '身份证不可为空',
        icon:none
      })
      return;
    }
    if (phoneNum == null || phoneNum == '') {
      wx.showToast({
        title: '身份证不可为空',
        icon: none
      })
      return;
    }
    if (!verifyCode.match(/^\d{6}$/)) {
      wx.showToast({
        title: '验证码错误',
        icon: none
      })
      return;
    }
    //避免重复点击提交
    that.setData({
      loginLock: true
    })
    wx.showLoading({
      title: '开始验证个人信息',
    })
    //首次登录，验证个人信息并登录
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //已经授权，可以直接调用get'User'Info，不会弹框
          wx.login({
            success: function (res) {
              var code = res.code;//登录凭证
              console.log("code:" + code)
              if (code) {
                //调用获取用户信息接口
                wx.getUserInfo({
                  success: function (res) {
                    console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
                    app.http.loginToServers(res.encryptedData, res.iv, code, cardId, phoneNum,verifyCode)
                      .then(res => {
                        wx.hideLoading()
                        console.log(res)
                        if (res.resultCode == 0) {
                          console.log("登录成功，返回数据" + res.data)
                          wx.setStorage({
                            key: 'localUserInfo',
                            data: res.data,
                          })
                          wx.switchTab({
                            url: '../../pages/index/index',
                            success: function (res) { },
                            fail: function (res) { },
                            complete: function (res) { },
                          })
                        } else if (res.resultCode == -2) {
                          console.log(res.resultDesc)
                          
                          wx.navigateTo({
                            url: '../../pages/regs/regs',
                          })
                        } else {
                          console.log(res.resultCode)
                          if (res.resultDesc == '该用户不存在') {
                            console.log("跳转至认证界面重新登录")
                          }
                        }
                      })
                      .catch(res => {
                        wx.hideLoading()
                        console.error(res)
                        wx.showToast({
                          title: '出错了',
                          icon: 'none'
                        })
                      })
                  }
                })
              }
            }
          })
          that.setData({
            loginLock:false
          })
        }
      }
    })
  },

  restInput:function(){
    let that = this;
    console.log("清空输入信息")
    //重置数据的时候，所有数据还原
    that.setData({
      cardId: '',
      phoneNum: '',
      isCard: true,
      isCheckNum: true,
      isPhone: true,
      currentTime: 61,
      loginLock: false,
      verifyCode: ''
    })
  }
})