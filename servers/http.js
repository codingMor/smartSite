import request from './request.js'
class http {
  constructor() {
    this._baseUrl = 'https://www.zhgd.online:8080'
    this._defaultHeader = {
      'data-tupe': 'application/json'
    }
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
  loginToServers(encryptedData = '', iv = '', code = '', idCard = '', phoneNum = '', shortCode = '') {
    let data = {
      encryptedData: encryptedData,
      iv: iv,
      code: code,
      idCard: idCard,
      phoneNum: phoneNum,
      shortCode: shortCode
    }
    return this._request.postRequest(this._baseUrl + '/securitymgmt-server/v1/wechat/wxlogin', data).then(res => res.data)
  }

  /**
   * 发送短信验证码
   */
  sendShortCode(idCard = '', phoneNum = '') {
    let data = {
      idCard: idCard,
      phoneNum: phoneNum
    }
    return this._request.postRequest(this._baseUrl + '/securitymgmt-server/v1/wechat/sendCode', data).then(res => res.data)
    // return this._request.postRequest(this._baseUrl + '/securitymgmt-server/v1/wechat/wxlogin/sendCode',data)
    // .then(res => res.data)
  }

  /**
   * 通过身份证号码获取该用户拥有那些项目
   */
  getProjects(idCard = '') {
    let data = {
      idCard: idCard
    }
    return this._request.postRequest(this._baseUrl + '/securitymgmt-server/v1/wechat/wxGetProjectsByUserIdCard', data).then(res => res.data)
  }

  /**
   * 用户修改手机号码
   */
  updateUserPhone(idCard = '', phoneNum = '', verifyCode = '') {
    let data = {
      idCard: idCard,
      phoneNum: phoneNum,
      verifyCode: verifyCode
    }
    return this._request.postRequest(this._baseUrl + '/securitymgmt-server/v1/wechat/updateUserPhone', data).then(res => res.data)
  }

  /**
   * 交卷（安全考评）
   */
  insertRecord(answer_paper = '', assessment_task_id = '', wx_staffid = '') {
    let data = {
      answer_paper: answer_paper,
      assessment_task_id: assessment_task_id,
      wx_staffid: wx_staffid
    }
    return this._request.postRequest(this._baseUrl + '/securitymgmt-server/v1/wechat/insertRecord', data).then(res => res.data)
  }

  /**
   * 获取安全考评任务列表
   */
  getAssessmentTasks(project_id = '', taskType = '', wx_staffid = '') {
    let data = {
      project_id: project_id,
      taskType: taskType,
      wx_staffid: wx_staffid
    }
    return this._request.postRequest(this._baseUrl + '/securitymgmt-server/v1/wechat/getSafeAssessmentTasksByProjectId', data).then(res => res.data)
  }

  /**
   * 获取安全考评试卷
   */
  getAssesmentPaper(question_paper_id = '') {
    let data = {
      question_paper_id: question_paper_id
    }
    return this._request.postRequest(this._baseUrl + '/securitymgmt-server/v1/wechat/getSafeAssesmentPaper', data).then(res => res.data)
  }

/**
 * 通过身份证，短信验证码校验
 */
  checkCode(cardId='',verifyCode=''){
    let data = {
      cardId: cardId,
      verifyCode: verifyCode
    }
    return this._request.postRequest(this._baseUrl + '/securitymgmt-server/v1/wechat/checkCode',data).then(res => res.data)
  }


}
export default http