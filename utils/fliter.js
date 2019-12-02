const appData = getApp().globalData;
//filter.js
function identityFilter(pageObj) {
  if (pageObj.onShow) {
    let _onShow = pageObj.onShow;
    // pageObj.onShow = function () {
    //   service.identityCheck(() => {
    //     //跳转到登录页
    //     wx.redirectTo({
    //       url: "/pages//logs/logs"
    //     });
    //   }, () => {
    //     //获取页面实例，防止this劫持
    //     let currentInstance = getPageInstance();
    //     _onShow.call(currentInstance);
    //   });
    // }

      // pageObj.onShow = function(){
      //   let local = appData.localUser;
      //   let status = 0;
      //   if(local){
      //     status = local.statu;
      //   }
      //   status = 0;
      //   if(local && status == 1){
      //     let currentInstance = getPageInstance();
      //     _onShow.call(currentInstance);
      //   }else{
      //     wx.redirectTo({
      //       url: '/pages/logs/logs',
      //     })
      //   }
      // }
      pageObj.onShow = function(){
        appData.promise.then(()=>{
          wx.redirectTo({
            url: '/pages/logs/logs',
          });
        },()=>{
          let currentInstance = getPageInstance();
          _onShow.call(currentInstance);
        });
      }
  }
  return pageObj;
}

function getPageInstance() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

exports.identityFilter = identityFilter;