/**
 * 小程序登录工具
 */

/**
 * 时间
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 登录
 */
const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (ret) {
        console.log("开始请求登录数据,code："+ret.code),
        wx.request({
          url: 'https://www.zhgd.online:8080/securitymgmt-serve',
          method: 'POST',
          data: {
            code: ret.code,
          },
          success: function (data) {
            console.log(data)
            wx.setStorageSync('skey', data.data.key)
            resolve(data.data.key)
          }
        })
      }
    })
  })
}

/**
 * 用来校验当前用户的session_key是否有效，微信不会把session_key的有效期告知开发者，用户越频繁使用小程序，session_key有效期越长
 */
const checkSession = () => {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: () => {
        resolve(true)
      },
      fail: () => {
        resolve(false)
      }
    })
  })
}

//请求
const ajax = (url, data, method = 'GET', config = {}) => {
  let skey = wx.getStorageSync('skey')
  if (!skey) { //没有skey，首次登录
    return new Promise((resolve, reject) => {
      login()
      reject('err')
    })
  } else {
    return new Promise((resolve, reject) => {
      checkSession().then(_ => {
        if (_) { // seesion_key有效
          wx.request({ //去服务器请求信息
            url,
            method: method.toLocaleUpperCase(),
            data,
            header: Object.assign({}, { skey }, config),
            success: (ret) => {
              resolve(ret.data)
            }
          })
        } else { // session_key失效，重新登录
          login()
          reject('err')
        }
      })
    })
  }
}


module.exports = {
  formatTime: formatTime,
  login,
  ajax
}