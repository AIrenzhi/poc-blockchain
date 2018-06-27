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

const r = require('rethinkdb')

const db = require('./')

const TABLE_NAME = 'orders'

const hasCurrentBlock = currentBlock => obj => {
  return r.and(
    obj('startBlockNum').le(currentBlock),
    obj('endBlockNum').gt(currentBlock)
  )
}

const getAttribute = attr => obj => obj(attr)
const getRecordId = getAttribute('recordId')
const getOrderId = getAttribute('orderId')
const getCustomerId = getAttribute('customerId')
const getVenderId = getAttribute('venderId')
const getAgentId = getAttribute('agentId')
const getStatus = getAttribute('status')



const getPublicKey = getAttribute('publicKey')
const getName = getAttribute('name')
const getRole = getAttribute('role')
const getReporters = getAttribute('reporters')
const getAuthorized = getAttribute('authorized')

const hasPublicKey = key => obj => {
  return r.eq(
    key,
    getPublicKey(obj)
  )
}

const getAssociatedAgentId = role => record => record(role).nth(-1)('agentId')
const getOwnerId = getAssociatedAgentId('owners')
const getCustodianId = getAssociatedAgentId('custodians')

const isAssociatedWithRecord = association => agent => record => {
  return r.eq(
    association(record),
    getPublicKey(agent)
  )
}

const isRecordOwner = isAssociatedWithRecord(getOwnerId)
const isRecordCustodian = isAssociatedWithRecord(getCustodianId)

const isReporter = agent => property => {
  return getReporters(property)
    .filter(hasPublicKey(getPublicKey(agent)))
    .do(seq => r.branch(
      seq.isEmpty(),
      false,
      getAuthorized(seq.nth(0))
    ))
}

const getTable = (tableName, block) =>
      r.table(tableName).filter(hasCurrentBlock(block))

const listQuery = filterQuery => block => {
  return getTable(TABLE_NAME, block)
    .filter(filterQuery)
    .map(agent => r.expr({
      'orderId': getOrderId(agent),
      'customerId': getCustomerId(agent),
      'status':getStatus(agent),
      'venderId':getVenderId(agent),
      'agentId':getAgentId(agent),
    })).coerceTo('array')
}

const fetchQuery = (publicKey, auth) => block => {
  return getTable(TABLE_NAME, block)
    .filter(hasPublicKey(publicKey))
    .pluck('name', 'publicKey')
    .nth(0)
    .do(
      agent => {
        return r.branch(
          auth,
          agent.merge(
            fetchUser(publicKey)),
          agent)
      })
}

const fetchUser = publicKey => {
  return r.table('users')
    .filter(hasPublicKey(publicKey))
    .pluck('username', 'email', 'encryptedKey')
    .nth(0)
}

const list = filterQuery => db.queryWithCurrentBlock(listQuery(filterQuery))

const fetch = (publicKey, auth) =>
      db.queryWithCurrentBlock(fetchQuery(publicKey, auth))

module.exports = {
  list,
  fetch
}
