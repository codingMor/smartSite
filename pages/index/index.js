//index.js
//获取应用实例
const app = getApp()
let fliter = require('../../utils/fliter.js')

//重新的有过滤器的page（）
Page(fliter.identityFilter({
  data: {
    projects: [],
    selectProject: {},
    index: 0,
    textArr: ['安全教育', '安全黑名单', "安全考评"],
    images: ['../../images/tabicon/safeEducation.png', '../../images/tabicon/safeBlackList.png', '../../images/tabicon/safeeValuation.png']
  },
  onLoad: function() {

    this.getProjectsFromServers();
  },

  /**
   * 项目选择事件
   */
  selectProject: function(e) {
    let that = this;
    let selecteIndex = e.detail.value;
    let selectProject = that.data.projects[selecteIndex];
    console.log('选择的工程是', selectProject)
    this.setData({
      index: e.detail.value,
      selectProject: selectProject
    })
    //将选中的工程存储到本地缓存，用于安全考评的使用
    wx.setStorageSync("selectProject", selectProject);
  },

  /**
   * 安全教育点击事件
   */
  safeEducation: function() {
    console.log("点击了安全教育")
  },

  /**
   * 黑名单点击事件
   */
  safeBlackList: function() {
    console.log("点击了安全黑名单")
  },
  /**
   * 安全考评点击事件
   */
  safeEvaluations: function() {
    console.log('点击了安全考评')
    wx.navigateTo({
      url: '../evaluations/safeEvaluation',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 从服务器获取项目信息
   */
  getProjectsFromServers: function() {
    var that = this;
    //首先从缓存中获取缓存的用户身份证号码
    //将身份证号码发送到服务器获取项目列表信息
    let localUserInfo = wx.getStorageSync("localUserInfo");
    console.log(localUserInfo)
    let idCard = '';
    if (localUserInfo) {
      idCard = localUserInfo.idCard;
      console.log(idCard)
    }
    if (idCard != '') {
      console.log("开始查询身份证号码为：" + idCard + "下的所有项目列表信息")
      app.http.getProjects(idCard)
        .then(res => {
          console.log(res)
          that.setData({
            projects: res.data
          })
          //设置默认选中的项目
          wx.setStorageSync("selectProject", res.data[0])
        })
    }
  },
  onShow: function() {
    //显示页面，此方法空的也应该有此方法，用来使用过滤器.
  }
}))


// Page({
//   data: {
//     projects: [],
//     selectProject:{},
//     index: 0,
//     textArr: ['安全教育', '安全黑名单', "安全考评"],
//     images: ['../../images/tabicon/safeEducation.png', '../../images/tabicon/safeBlackList.png', '../../images/tabicon/safeeValuation.png']
//   },
//   onLoad: function() {

//     this.getProjectsFromServers();
//   },

//   /**
//    * 项目选择事件
//    */
//   selectProject : function(e){
//     let that = this;
//     let selecteIndex = e.detail.value;
//     let selectProject = that.data.projects[selecteIndex];
//     console.log('选择的工程是',selectProject)
//     this.setData({
//       index:e.detail.value,
//       selectProject:selectProject
//     })
//     //将选中的工程存储到本地缓存，用于安全考评的使用
//     wx.setStorageSync("selectProject",selectProject);
//   },

//   /**
//    * 安全教育点击事件
//    */
//   safeEducation: function() {
//     console.log("点击了安全教育")
//   },

//   /**
//    * 黑名单点击事件
//    */
//   safeBlackList: function() {
//     console.log("点击了安全黑名单")
//   },
//   /**
//    * 安全考评点击事件
//    */
//   safeEvaluations: function() {
//     console.log('点击了安全考评')
//     wx.navigateTo({
//       url: '../evaluations/safeEvaluation',
//       success: function(res) {},
//       fail: function(res) {},
//       complete: function(res) {},
//     })
//   },

// /**
//  * 从服务器获取项目信息
//  */
//   getProjectsFromServers:function(){
//     var that = this;
//     //首先从缓存中获取缓存的用户身份证号码
//     //将身份证号码发送到服务器获取项目列表信息
//     let localUserInfo = wx.getStorageSync("localUserInfo");
//     console.log(localUserInfo)
//     let idCard = '';
//     if(localUserInfo){
//       idCard = localUserInfo.idCard;
//       console.log(idCard)
//     }
//     if(idCard != ''){
//       console.log("开始查询身份证号码为："+idCard+"下的所有项目列表信息")
//       app.http.getProjects(idCard)
//       .then(res=>{
//         console.log(res)
//         that.setData({
//           projects: res.data
//         })
//         //设置默认选中的项目
//         wx.setStorageSync("selectProject", res.data[0])
//       })
//     }
//   },

// })