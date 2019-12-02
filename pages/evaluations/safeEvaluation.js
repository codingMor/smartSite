// pages/evaluations/safeEvaluation.js

const app = getApp()
let fliter = require('../../utils/fliter.js')

//重写有拦截器的页面
Page(fliter.identityFilter({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取任务列表
    this.getTaskListFromServer()
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
      console.log("切换了tab：" + this.data.currentTab)
      this.getTaskListFromServer();
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
    var that = this;
    var selected = e.currentTarget.dataset.selected;
    console.log(selected)

    //当tab为1时点击跳转至考评界面，当tab为2时点击跳转至查看考评界面
    if (that.data.currentTab == 1) {
      wx.showModal({
        title: '提示',
        content: '现在开始：' + selected.assessment_task_name,
        success: function(sm) {
          if (sm.confirm) {
            wx.navigateTo({
              url: "evaluations?assessment_task_id=" + selected.assessment_task_id + "&engineer_id=" + selected.engineer_id + "&project_id=" + selected.project_id + "&question_paper_id=" + selected.question_paper_id,
            })
          } else if (sm.cancel) {}
        }
      })
    } else if (that.data.currentTab == 2) {
      //跳转至查看考评任务界面
    }
  },

  /**
   * 从服务器获取任务列表
   */
  getTaskListFromServer: function() {
    console.log("开始从服务器请求任务列表")
    let that = this;
    let selectProject = wx.getStorageSync("selectProject");
    let checkType = that.data.currentTab + '';
    let localUserInfo = wx.getStorageSync("localUserInfo")
    console.log("选中的项目id:" + selectProject.project_id + ",选中的类型:" + checkType + "用户id:" + localUserInfo.wechat_id)
    //请求服务获取列表
    if (selectProject && checkType && localUserInfo) {
      wx.showLoading({
        title: '加载中',
      })
      app.http.getAssessmentTasks(selectProject.project_id, checkType, localUserInfo.wechat_id)
        .then(res => {
          console.log(res)
          wx.hideLoading()
          let list = res.data;
          for (let i = 0; i < list.length; i++) {
            let end = '';
            end = list[i].end_time;
            end = end.substring(0, end.lastIndexOf("-") + 3)
            console.log(end)
            // list[i].taskTime = start +"~" + end;
            list[i].taskTime = end;
            console.log(list[i].taskTime)
          }
          that.setData({
            listData: list
          })
        })
    }
  }
}))
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     currentTab: 1,
//     listData: []
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function(options) {
//     //获取任务列表
//     this.getTaskListFromServer()
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function() {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function() {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function() {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function() {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function() {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function() {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function() {

//   },
//   /**
//    * 考评点击切换事件
//    */
//   swichNav: function(e) {
//     if (this.data.currentTab === e.target.dataset.current) {
//       return false;
//     } else {
//       this.setData({
//         currentTab: e.target.dataset.current
//       })
//       console.log("切换了tab：" + this.data.currentTab)
//       this.getTaskListFromServer();
//     }
//   },

//   /**
//    * tab发生改变的事件
//    */
//   bindChange: function(e) {
//     this.setData({
//       currentTab: e.detail.current
//     });
//   },
//   /**
//    * 点击进入考评事件
//    */
//   starEvaluation: function(e) {
//     var that = this;
//     var selected = e.currentTarget.dataset.selected;
//     console.log(selected)

//     //当tab为1时点击跳转至考评界面，当tab为2时点击跳转至查看考评界面
//     if (that.data.currentTab == 1) {
//       wx.showModal({
//         title: '提示',
//         content: '现在开始：' + selected.assessment_task_name,
//         success: function(sm) {
//           if (sm.confirm) {
//             wx.navigateTo({
//               url: "evaluations?assessment_task_id=" + selected.assessment_task_id + "&engineer_id=" + selected.engineer_id + "&project_id=" + selected.project_id + "&question_paper_id=" + selected.question_paper_id,
//             })
//           } else if (sm.cancel) {}
//         }
//       })
//     } else if (that.data.currentTab == 2) {
//       //跳转至查看考评任务界面
//     }
//   },

//   /**
//    * 从服务器获取任务列表
//    */
//   getTaskListFromServer: function() {
//     console.log("开始从服务器请求任务列表")
//     let that = this;
//     let selectProject = wx.getStorageSync("selectProject");
//     let checkType = that.data.currentTab + '';
//     let localUserInfo = wx.getStorageSync("localUserInfo")
//     console.log("选中的项目id:" + selectProject.project_id + ",选中的类型:" + checkType + "用户id:" + localUserInfo.wechat_id)
//     //请求服务获取列表
//     if (selectProject && checkType && localUserInfo) {
//       wx.showLoading({
//         title: '加载中',
//       })
//       app.http.getAssessmentTasks(selectProject.project_id, checkType, localUserInfo.wechat_id)
//         .then(res => {
//           console.log(res)
//           wx.hideLoading()
//           let list = res.data;
//           for (let i = 0; i < list.length; i++) {
//             let end = '';
//             end = list[i].end_time;
//             end = end.substring(0, end.lastIndexOf("-") + 3)
//             console.log(end)
//             // list[i].taskTime = start +"~" + end;
//             list[i].taskTime = end;
//             console.log(list[i].taskTime)
//           }
//           that.setData({
//             listData: list
//           })
//         })
//     }
//   }
// })