var mongoose = require('mongoose'),
  Schema = mongoose.Schema

var schema = Schema({
  name: String, //姓名
  gender: String, //性别
}, {
  timestamps: true
})

// schema.statics.GENDER_MALE = 'male' //男
// schema.statics.GENDER_FEMALE = 'female' //女

// schema.post('save', function (doc, next) {
//   if(doc.password){
//     //部门审批通过
//     next()
//   } else {
//     doc.password = md5(doc.mobile)
//     doc.save(next)
//   }
// })

module.exports = mongoose.model('user', schema)
