const express = require('express'),
  _ = require('lodash')

  const config = require('../system/config')

module.exports.bootstrap = (next) => {
  const app = express()

  _vendorMiddlewares(app)
  _appMiddlewares(app)
  _biz(app)
  _rest(app)
  _errHandler(app)

    // Listen
  app.listen(config.PORT)

  // next()
}

const _vendorMiddlewares = app => {
  // cros session 等
}

const _appMiddlewares = app => {
    // inject accessors
  const SessionAccessor = require('./accessors/SessionAccessor'),
    LocalsAccessor = require('./accessors/LocalsAccessor')
  app.use((req, res, next) => {
    // Log
    console.info(`in ${req.method} ${req.url}`, {
      ip: req.header('X-Real-IP') || req.connection.remoteAddress,
    })
    next()
  })
  app.use((req, res, next) => {
        // Prepare output
    req.$injection = {}
    // req.session = req.session || {}
    // req.$session = new SessionAccessor(req.session)
    res.locals = {}
    res.$locals = new LocalsAccessor(res.locals)
    next()
  })
    // injectLoginInfo
  app.use(require('./injectors/injectLoginInfo'))
}

const _biz = app => {
  const router = express.Router()
  const biz = require('./biz')

  const output = (req, res) => {
    res.json(res.$locals.getData())
  }
  for (let categoryName in biz) {
    const category = biz[categoryName]
    for (let apiName in category) {
      const api = category[apiName]
      router[api.method](`/${categoryName}/${apiName}${api.wildcard ? '/*' : ''}`, api.middlewares, api.output || output)
    }
  };

  app.use('/biz', router)
}

const _rest = app => {
  const restify = require('express-restify-mongoose')

  const router = express.Router()
  restify.defaults({
    prefix: '/rest',
    version: '',
        // Whether to use .findOneAndUpdate() or .findById() and then .save(), allowing document middleware to be called. For more information regarding mongoose middleware, read the docs.
    findOneAndUpdate: false,
    findOneAndRemove: false
  })

  const rest = require('./rest')
  for (var categoryName in rest) {
    var category = rest[categoryName]
    category.options = category.options || {}
    category.options.name = category.options.name || categoryName
    restify.serve(router, category.model, category.options)
  };
  app.use('/', router)
}

const _errHandler = (app) => {
  app.use((err, req, res, next) => {
    const json = {message: err.message}
    if (err instanceof Error) {
      json.message = err.message
      json.stacks = err.stack.split('\n')
    } else {
      json.message = err
    }
    // Log
    // logger.info(`err ${req.method} ${req.url}`, {
    //   method: req.method,
    //   url: req.url,
    //   headers: req.headers,
    //   query: req.query,
    //   body: req.body,
    //   ip: req.header('X-Real-IP') || req.connection.remoteAddress,
    //   session: req.session,
    //   err: json
    // })
    res.json({err: json})
  })
}
