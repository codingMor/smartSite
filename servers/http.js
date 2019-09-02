import request from './request.js'
class http{
  constructor() {
    this._baseUrl = 'https://www.zhgd.online:8080'
    this._defaultHeader = { 'data-tupe': 'application/json' }
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }

  /**
   * 登录到服务器
   */
  loginToServers(encryptedData = '', iv = '',code = '', idCard = '',phoneNum=''){
    let data = { encryptedData: encryptedData, iv: iv, code: code, idCard: idCard,phoneNum:phoneNum}
    return this._request.postRequest(this._baseUrl + '/securitymgmt-server/v1/wechat/wxlogin',data).then(res => res.data)
  }
}
export default http