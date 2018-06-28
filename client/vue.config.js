module.exports = {
    devServer: {
      proxy: {
        '/biz': {
          target: 'htp://localhost:3000'
        }
      }
    },
    lintOnSave: false
  }