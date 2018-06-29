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

// const r = require('rethinkdb')
// const _ = require('lodash')
// const jsSchema = require('js-schema')
const config = require('../system/config')

const mongoose = require('mongoose')

// const User = require('../models/User')

// const HOST = config.DB_HOST
// const PORT = config.DB_PORT
// const NAME = config.DB_NAME
// const RETRY_WAIT = config.RETRY_WAIT
// const AWAIT_TABLE = 'blocks'

// Connection to db for query methods, run connect before querying
// let connection = null

const connect = async () => {
  const db = config.db,
    url = `mongodb://blocksuser:123456@localhost:27017/blocks`
  let conection = await mongoose.connect(url)
  return conection
}

module.exports = {
  connect
}
