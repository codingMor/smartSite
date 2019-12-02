// pages/evaluations/evaluations.js
const app = getApp()
let fliter = require('../../utils/fliter.js')

//重写有拦截器的页面
Page(fliter.identityFilter({
  /**
   * 页面的初始数据
   */
  data: {
    submit: "交卷",
    pre: "上一题",
    next: "下一题",
    preDisabled: true,
    questions: [],
    currentQuestion: [],
    currentIndex: 0,
    answers: [],
    answer: '',
    checkOne: '',
    checkTwo: '',
    checkThree: '',
    checkFour: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // console.log("题库" + toptics[0].toptic);
    // console.log(options)
    let paperId = options.question_paper_id;
    console.log("要考核的试卷id:" + paperId)
    this.getPaperFromServer(paperId);

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
   * 上一题
   */
  btnPre: function() {
    var that = this;
    let index = that.data.currentIndex;
    if (index > 0) {
      index -= 1;
      that.setData({
        currentIndex: index,
        preDisabled: index == 0 ? true : false,
        currentQuestion: that.data.questions[index]
      })
    }

    let currentQuestion = that.data.questions[index];
    that.isCheckedRadio(currentQuestion);

  },
  /**
   * 下一题
   */
  btnNext: function() {
    var that = this
    let index = that.data.currentIndex;
    if (index < that.data.questions.length - 1) {
      index += 1;
      that.setData({
        preDisabled: false,
        currentIndex: index,
        currentQuestion: that.data.questions[index]
      })
    }

    let currentQuestion = that.data.questions[index];
    that.isCheckedRadio(currentQuestion);

  },
  /**
   * 交卷
   */
  submitEvaluations: function() {
    //交卷之前先检查是否白卷
    let that = this;
    let questions = that.data.questions;
    let count = 0;
    let index = -1;
    for (let i = 0; i < questions.length; i++) {
      let answer = questions[i].answer;
      if (!answer) {
        count++;
        if (index == -1) {
          index = i;
        }
      }
    }
    if (count == 0) {

      wx.showModal({
        title: '确认',
        content: '是否现在提交',
        success: function(sm) {
          if (sm.confirm) {
            //确认提交
            let assessment_task_id = that.options.assessment_task_id;
            console.log(assessment_task_id)
            let localUser = wx.getStorageSync("localUserInfo")
            let wx_staffid = localUser.wechat_id;
            console.log(wx_staffid)

            let arr = [];
            for (let i = 0; i < questions.length; i++) {
              let answer = questions[i].answer;
              arr.push(answer)
            }
            let answer_paper = arr.join(",")
            console.log(answer_paper)
            wx.showLoading({
              title: '提交中',
            })
            app.http.insertRecord(answer_paper, assessment_task_id, wx_staffid)
              .then(res => {
                wx.hideLoading()
                console.log(res)
                if (0 == res.resultCode) {
                  wx.showToast({
                    title: '考评提交完成',
                  })
                  wx.switchTab({
                    url: '../index/index',
                    success: function(res) {},
                    fail: function(res) {},
                    complete: function(res) {},
                  })
                } else {
                  wx.showToast({
                    title: 'Faild to report Assessment Paper' + res.resultDesc,
                    icon: none
                  })
                }
              })
          } else if (sm.cancel) {
            //取消
          }
        }
      })
    } else {
      console.log("第一道未作答的题号" + index)
      wx.showModal({
        title: '提示',
        content: '尚有' + count + "道题目未做答，请作答后再提交",
        success: function(sm) {
          if (sm.confirm) {
            //确认跳转至第一道未作答的题目
            that.setData({
              currentIndex: index,
              currentQuestion: questions[index]
            })
          } else if (sm.cancel) {
            //取消
          }
        }
      })
    }

  },
  /**
   * 单选题选择的答案
   */
  selectedAnswer: function(e) {
    //如果选中，则修改选中状态
    console.log(e.detail)
    let that = this;
    let checked = e.detail.value;
    let questions = that.data.questions;
    let currentQuestion = that.data.currentQuestion;
    let index = that.data.currentIndex;
    console.log(checked)
    console.log(questions)
    console.log(currentQuestion)
    console.log(index)
    questions[index].answer = currentQuestion.question_id + ":" + currentQuestion.question_type + ":" + checked;
    console.log(questions)
    that.setData({
      questions: questions
    })

  },

  /**
   * 检查单选题选中状态
   */
  isCheckedRadio(currentQuestion) {
    let that = this;
    let answer = currentQuestion.answer;
    if (currentQuestion.question_type != 1) {
      //如果题目类型不为1,不是选择题
      return;
    }

    /**
     * 设定默认选中状态
     */
    let checkOne = '';
    let checkTwo = '';
    let checkThree = '';
    let checkFour = '';
    /**
     * 当有选择的时候
     */
    if (answer) {
      let checked = answer.split(":")[2];
      console.log("选中的答案是：" + checked)
      switch (checked) {
        case 'a':
          checkOne = true;
          break;
        case 'b':
          checkTwo = true;
          break;
        case 'c':
          checkThree = true;
          break;
        case 'd':
          checkFour = true;
          break;
      }
    }
    console.log(answer)
    console.log(checkOne)
    console.log(checkTwo)
    console.log(checkThree)
    console.log(checkFour)

    that.setData({
      checkOne: checkOne,
      checkTwo: checkTwo,
      checkThree: checkThree,
      checkFour: checkFour
    })

  },

  /**
   * 从服务器获取考卷
   */
  getPaperFromServer: function(paperId) {
    let that = this;
    console.log("开始去网上下载试卷" + paperId)
    if (paperId == null) {
      return;
    }
    wx.showLoading({
      title: '加载试卷中',
    })
    app.http.getAssesmentPaper(paperId)
      .then(res => {
        wx.hideLoading()
        if ("0" == res.resultCode) {
          let questions = res.data.questions;
          console.log(questions)
          that.setData({
            questions: questions,
            currentQuestion: questions[0]
          })

        } else {
          wx.showToast({
            title: 'Faild to loading paper' + res.resultDesc,
            icon: none
          })
        }
      })
  },

  /**
   * 选择题号
   */
  checkQuestion: function(e) {
    let that = this;
    let selected = parseInt(e.currentTarget.id);
    let questions = that.data.questions;
    console.log("选中的下标是：" + selected)
    that.setData({
      currentIndex: selected,
      currentQuestion: questions[selected]
    })
    console.log(that.data.currentIndex)
    that.isCheckedRadio(questions[selected]);
  }
}))
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     submit: "交卷",
//     pre: "上一题",
//     next: "下一题",
//     preDisabled: true,
//     questions: [],
//     currentQuestion: [],
//     currentIndex: 0,
//     answers: [],
//     answer: '',
//     checkOne: '',
//     checkTwo: '',
//     checkThree: '',
//     checkFour: ''
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function(options) {

//     // console.log("题库" + toptics[0].toptic);
//     // console.log(options)
//     let paperId = options.question_paper_id;
//     console.log("要考核的试卷id:" + paperId)
//     this.getPaperFromServer(paperId);

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
//    * 上一题
//    */
//   btnPre: function() {
//     var that = this;
//     let index = that.data.currentIndex;
//     if (index > 0) {
//       index -= 1;
//       that.setData({
//         currentIndex: index,
//         preDisabled: index == 0 ? true : false,
//         currentQuestion: that.data.questions[index]
//       })
//     }

//     let currentQuestion = that.data.questions[index];
//     that.isCheckedRadio(currentQuestion);

//   },
//   /**
//    * 下一题
//    */
//   btnNext: function() {
//     var that = this
//     let index = that.data.currentIndex;
//     if (index < that.data.questions.length - 1) {
//       index += 1;
//       that.setData({
//         preDisabled: false,
//         currentIndex: index,
//         currentQuestion: that.data.questions[index]
//       })
//     }

//     let currentQuestion = that.data.questions[index];
//     that.isCheckedRadio(currentQuestion);

//   },
//   /**
//    * 交卷
//    */
//   submitEvaluations: function() {
//     //交卷之前先检查是否白卷
//     let that = this;
//     let questions = that.data.questions;
//     let count = 0;
//     let index = -1;
//     for (let i = 0; i < questions.length; i++) {
//       let answer = questions[i].answer;
//       if (!answer) {
//         count++;
//         if (index == -1) {
//           index = i;
//         }
//       }
//     }
//     if (count == 0) {

//       wx.showModal({
//         title: '确认',
//         content: '是否现在提交',
//         success: function(sm) {
//           if (sm.confirm) {
//             //确认提交
//             let assessment_task_id = that.options.assessment_task_id;
//             console.log(assessment_task_id)
//             let localUser = wx.getStorageSync("localUserInfo")
//             let wx_staffid = localUser.wechat_id;
//             console.log(wx_staffid)

//             let arr = [];
//             for (let i = 0; i < questions.length; i++) {
//               let answer = questions[i].answer;
//               arr.push(answer)
//             }
//             let answer_paper = arr.join(",")
//             console.log(answer_paper)
//             wx.showLoading({
//               title: '提交中',
//             })
//             app.http.insertRecord(answer_paper, assessment_task_id, wx_staffid)
//             .then(res => {
//               wx.hideLoading()
//               console.log(res)
//               if(0 == res.resultCode){
//                 wx.showToast({
//                   title: '考评提交完成',
//                 })
//                 wx.switchTab({
//                   url: '../index/index',
//                   success: function(res) {},
//                   fail: function(res) {},
//                   complete: function(res) {},
//                 })
//               }else{
//                 wx.showToast({
//                   title: 'Faild to report Assessment Paper' + res.resultDesc,
//                   icon:none
//                 })
//               }
//             })
//           } else if (sm.cancel) {
//             //取消
//           }
//         }
//       })
//     } else {
//       console.log("第一道未作答的题号" + index)
//       wx.showModal({
//         title: '提示',
//         content: '尚有' + count + "道题目未做答，请作答后再提交",
//         success: function(sm) {
//           if (sm.confirm) {
//             //确认跳转至第一道未作答的题目
//             that.setData({
//               currentIndex: index,
//               currentQuestion: questions[index]
//             })
//           } else if (sm.cancel) {
//             //取消
//           }
//         }
//       })
//     }

//   },
//   /**
//    * 单选题选择的答案
//    */
//   selectedAnswer: function(e) {
//     //如果选中，则修改选中状态
//     console.log(e.detail)
//     let that = this;
//     let checked = e.detail.value;
//     let questions = that.data.questions;
//     let currentQuestion = that.data.currentQuestion;
//     let index = that.data.currentIndex;
//     console.log(checked)
//     console.log(questions)
//     console.log(currentQuestion)
//     console.log(index)
//     questions[index].answer = currentQuestion.question_id +":"+currentQuestion.question_type + ":" + checked;
//     console.log(questions)
//     that.setData({
//       questions: questions
//     })

//   },

//   /**
//    * 检查单选题选中状态
//    */
//   isCheckedRadio(currentQuestion) {
//     let that = this;
//     let answer = currentQuestion.answer;
//     if (currentQuestion.question_type != 1) {
//       //如果题目类型不为1,不是选择题
//       return;
//     }

//     /**
//      * 设定默认选中状态
//      */
//     let checkOne = '';
//     let checkTwo = '';
//     let checkThree = '';
//     let checkFour = '';
//     /**
//      * 当有选择的时候
//      */
//     if (answer) {
//       let checked = answer.split(":")[2];
//       console.log("选中的答案是：" + checked)
//       switch (checked) {
//         case 'a':
//           checkOne = true;
//           break;
//         case 'b':
//           checkTwo = true;
//           break;
//         case 'c':
//           checkThree = true;
//           break;
//         case 'd':
//           checkFour = true;
//           break;
//       }
//     }
//     console.log(answer)
//     console.log(checkOne)
//     console.log(checkTwo)
//     console.log(checkThree)
//     console.log(checkFour)

//     that.setData({
//       checkOne: checkOne,
//       checkTwo: checkTwo,
//       checkThree: checkThree,
//       checkFour: checkFour
//     })

//   },

//   /**
//    * 从服务器获取考卷
//    */
//   getPaperFromServer: function(paperId) {
//     let that = this;
//     console.log("开始去网上下载试卷" + paperId)
//     if (paperId == null) {
//       return;
//     }
//     wx.showLoading({
//       title: '加载试卷中',
//     })
//     app.http.getAssesmentPaper(paperId)
//       .then(res => {
//         wx.hideLoading()
//         if ("0" == res.resultCode) {
//           let questions = res.data.questions;
//           console.log(questions)
//           that.setData({
//             questions: questions,
//             currentQuestion: questions[0]
//           })

//         } else {
//           wx.showToast({
//             title: 'Faild to loading paper' + res.resultDesc,
//             icon:none
//           })
//         }
//       })
//   },

// /**
//  * 选择题号
//  */
//   checkQuestion:function(e){
//     let that = this;
//     let selected = parseInt(e.currentTarget.id);
//     let questions = that.data.questions;
//     console.log("选中的下标是："+selected)
//     that.setData({
//       currentIndex: selected,
//       currentQuestion: questions[selected]
//     })
//     console.log(that.data.currentIndex)
//     that.isCheckedRadio(questions[selected]);
//   }
// })