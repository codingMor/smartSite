//index.js
//获取应用实例

Page({
  data: {
    projects: ['项目1', '项目2', '项目3'],
    objectProjects: [{
        id: 0,
        projectName: '项目1'
      },
      {
        id: 1,
        projectName: '项目2'
      },
      {
        id: 2,
        projectName: '项目3'
      }
    ],
    index: 0,

    textArr: ['安全教育', '安全黑名单', "安全考评"],
    images: ['../../images/tabicon/safeEducation.png', '../../images/tabicon/safeBlackList.png', '../../images/tabicon/safeeValuation.png']
  },
  onLoad: function() {},

  /**
   * 项目选择事件
   */
  selectProject : function(e){
    console.log('选择的工程是',e.detail.value)
    this.setData({
      index:e.detail.value
    })
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
  }

})