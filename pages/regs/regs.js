// pages/regs/regs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
     "cardId": "",
     "phoneNum": "13812345678" 
    },
    isCard:true,
    isCheckNum:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 输入身份证号码后验证
   */
  idcardCheck:function(e){
    var that = this;
    console.log("输入完毕后开始验证身份证号码")
    var cardId = e.detail.value;
    console.log("输入的身份证号码是："+cardId);
    console.log(that.checkCode(cardId));
    that.setData({
      isCard:that.checkCode(cardId)
    })
  },

checkCode:function(cardId){
  var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
  var code = cardId.substring(17);
  if(p.test(cardId)){
    var sum = 0 ;
    for(var i = 0;i<17;i++){
      sum += cardId[i]*factor[i];
    }
    if(parity[sum % 11] == code.toUpperCase()){
      return true;
    }
  }
  return false;
}
})