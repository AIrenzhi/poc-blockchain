const ReqSessionAccessor = module.exports = function (session) {
    this.session = session
  }
  
  ReqSessionAccessor.prototype.setShuyueUser = function (shuyueUser) {
    this.session.shuyueUser = shuyueUser
    this.session.cookie.maxAge = 2 * 60 * 60 * 1000 // 2 hours for staff
  }
  
  ReqSessionAccessor.prototype.getShuyueUser = function (ref) {
    if (this.session.shuyueUser) {
      this.session.cookie.maxAge = 2 * 60 * 60 * 1000 // 2 hours for staff
      return this.session.shuyueUser
    }
  }
  
  ReqSessionAccessor.prototype.clearShuyueUser = function (ref) {
    delete this.session.shuyueUser
  }
  
  ReqSessionAccessor.prototype.setUser = function (user) {
    this.session.loginUserRef = user.id
  }
  
  ReqSessionAccessor.prototype.getUserRef = function (ref) {
    return this.session.loginUserRef
  }
  
  ReqSessionAccessor.prototype.clearUser = function (ref) {
    delete this.session.loginUserRef
  }
  
  ReqSessionAccessor.prototype.addSmsCaptcha = function (code, purpose, expiredAt) {
    this.session.smsCaptchas = this.session.smsCaptchas || []
    this.session.smsCaptchas.push({code, purpose, expiredAt})
  }
  
  ReqSessionAccessor.prototype.getSmsCaptchas = function (purpose) {
    this.session.smsCaptchas = this.session.smsCaptchas || []
    return this.session.smsCaptchas.filter(code => {
      return code.purpose === purpose
    })
  }
  
  ReqSessionAccessor.prototype.clearSmsCaptcha = function (purpose) {
    this.session.smsCaptchas = this.session.smsCaptchas || []
    this.session.smsCaptchas = this.session.smsCaptchas.filter(code => {
      return code.purpose !== purpose
    })
    if (this.session.smsCaptchas.length === 0) {
      delete this.session.smsCaptchas
    }
  }
  