'use strict'

const db = require('./subscriber/db')
const subscriber = require('./subscriber')
const protos = require('./subscriber/protos')

Promise.all([
  db.connect(),
  protos.compile()
])
  .then(subscriber.start)
  .catch(err => console.error(err.message))
