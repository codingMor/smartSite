//logs.js
const app = getApp();

Page({
  data: {
    textLog: "智慧工地（继善高科）",
    textBtn: "进入智慧工地",
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    localUserInfo:{
      idCard:'',
      phoneNum:'',
      statu:'',
      wechat_id:''
    }
  },
  onLoad: function() {
    var that = this;
  },
  bindGetUserInfo: function(event){
    var that = this;
    wx.showLoading({
      title: '登录中……',
    })
  wx.getSetting({
    success:res=>{
      if (res.authSetting['scope.userInfo']){
        //已经授权，可以直接调用get'User'Info，不会弹框
        wx.login({
          success: function(res){
            var code = res.code;//登录凭证
            console.log("code:"+code)
            if(code){
              //调用获取用户信息接口
              wx.getUserInfo({
                success: function(res){
                  console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
                  app.http.loginToServers(res.encryptedData,res.iv,code,'431103198903105754','')
                  .then(res =>{
                    wx.hideLoading()
                    console.log(res)
                    if(res.resultCode == 0){
                      console.log("登录成功，返回数据"+res.data)
                      wx.setStorage({
                        key: 'localUserInfo',
                        data: res.data,
                      })
                      wx.switchTab({
                        url: '../../pages/index/index',
                        success: function(res) {},
                        fail: function(res) {},
                        complete: function(res) {},
                      })
                    }else{
                      console.log(res.resultCode)
                      if(res.resultDesc == '该用户不存在'){
                        console.log("跳转至认证界面重新登录")
                      }
                    }
                  })
                  .catch(res =>{
                    wx.hideLoading()
                    console.error(res)
                    wx.showToast({
                      title: '出错了',
                      icon:'none'
                    })
                  })
                }
              })
            }
          }
        })
      }
    }
  })
  }
})
