//app.js
import{ajax,login} from './utils/util.js'
import http from './servers/http.js'
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
   
    this.getSys();

    // this.getLocalInfo();
    
    //检查用户登录
    let p = new Promise(function(resolve,reject){
      let local = wx.getStorageSync('localUserInfo');
      let status = 0;
      if(local){
        status = local.statu;
      }
      if(local && status == 1){
        //用户已登录，不拦截
      }else{
        //若用户未登录，拦截
        resolve();
      }
    });
    this.globalData.promise = p;
    console.log("测试promise:===============" + this.globalData.promise +"===================")
  },
  
  globalData: {
    userInfo: null,
    sysInfo:null,
    windowW:null,
    windowH:null,
    promise:null
  },
  Util:{
    ajax,
    login
  },
  http: new http(),

  //获取手机信息
   getSys: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log("手机型号："+res.model)
        console.log("手机像素密度" +res.pixelRatio)
        console.log("手机宽度（单位rpx）：" +res.windowWidth)
        console.log("手机高度（单位rpx）：" +res.windowHeight)
        console.log("手机语言类型：" +res.language)
        console.log("手机版本：" +res.version)
        console.log("platForm：" +res.platform)
        //设置变量值
        that.globalData.sysInfo = res;
        that.globalData.windowW = res.windowWidth;
        that.globalData.windowH = res.windowHeight;
      },
    })
  },

  //获取缓存信息
  // getLocalInfo:function(){
  //   let that = this;
  //   let local = wx.getStorageSync('localUserInfo');
  //   console.log("启动小程序加载缓存："+local)
  //   that.globalData.localUser = local;
  // }
})