// const async = require('async'),
//   _ = require('lodash')

// const masterModelPermission = require('./options/masterModelPermission')
// const bizModelPermission = require('./options/bizModelPermission')
// const validateUpdatedAt = require('./options/validateUpdatedAt')
// const logicDelete = require('./options/logicDelete')

// const _mergeOptions = (...optionsArr) => {
//   const merged = {}
//   optionsArr.forEach(options => {
//     for (let key in options) {
//       let value = options[key]
//       if (key.indexOf('pre') === 0 || key.indexOf('post') === 0) {
//         merged[key] = merged[key] || []
//         merged[key].push(value)
//       } else {
//         merged[key] = value
//       }
//     }
//   })
//   for (let key in merged) {
//     let value = merged[key]
//     if (key.indexOf('pre') === 0 || key.indexOf('post') === 0) {
//       (() => {
//         merged[key] = (req, res, next) => {
//           async.series(value.map(middleware => {
//             return next => {
//               middleware(req, res, next)
//             }
//           }), next)
//         }
//       })(value)
//     }
//   }
//   return merged
// }

/** 
 * @module /rest
 */
module.exports = {
  users: {
    model: require('../../models/User'),
    options: {}
  }
}
