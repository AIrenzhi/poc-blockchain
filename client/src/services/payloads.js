/**
 * Copyright 2017 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ----------------------------------------------------------------------------
 */
'use strict'

const _ = require('lodash')
const protobuf = require('protobufjs')

// Use the generated JSON to reference the .proto files in protos/
const protoJson = require('../generated_protos.json')

const ACTIONS = [
  "CREATE_USER",
  "UPDATE_USER",
  "CREATE_ENTITY",
  "UPDATE_ENTITY",
  "DELETE_ENTITY",
  "CHANGE_STATUS",
  "CREATE_CONCEPT",
  "UPDATE_CONCEPT",
  "DELETE_CONCEPT",
  "CREATE_ROLE",
  "UPDATE_ROLE",
  "DELETE_ROLE",
  "CREATE_LOG"
]

// Create dictionary with key, enum and class names
const titleify = allCaps => {
  return allCaps
    .split('_')
    .map(word => word[0] + word.slice(1).toLowerCase())
    .join('')
}

const actionMap = ACTIONS.reduce((map, enumName) => {
  const key = enumName[0].toLowerCase() + titleify(enumName).slice(1)
  const className = titleify(enumName) + 'Action'
  return _.set(map, key, { enum: enumName, name: className })
}, {})

// // Compile Protobufs
const root = protobuf.Root.fromJSON(protoJson)
const Payload = root.lookup('Payload')

_.map(actionMap, action => {
  return _.set(action, 'proto', root.lookup(action.name))
})

/**
 * Encodes a new Payload with the specified action
 */
const encode = (actionKey, actionData) => {
  const action = actionMap[actionKey]
  if (!action) {
    throw new Error('There is no payload action with that key')
  }

  return Payload.encode({
    action: root.Action[action.enum],
    timestamp: Math.floor(Date.now() / 1000),
    [actionKey]: action.proto.create(action.xform(actionData))
  }).finish()
}

const actionMethods = _.reduce(actionMap, (methods, value, key) => {
  return _.set(methods, key, _.partial(encode, key))
}, {})

// Create data xforms on an action by action basis
// const propertiesXformer = xform => data => {
//   return _.set(data, 'properties', data.properties.map(xform))
// }
// const valueXform = propertiesXformer(prop => PropertyValue.create(prop))
// const schemaXform = propertiesXformer(prop => {
//   if (prop.locationValue) {
//     prop.locationValue = Location.create(prop.locationValue)
//   }
//   return PropertySchema.create(prop)
// })

_.map(actionMap, action => _.set(action, 'xform', x => x))
// actionMap.createRecord.xform = valueXform
// actionMap.createRecordType.xform = schemaXform
// actionMap.updateProperties.xform = valueXform

export default _.assign({
  encode,
  FLOAT_PRECISION: 1000000
}, actionMethods)
