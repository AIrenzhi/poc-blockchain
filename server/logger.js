var log4js = require('log4js');
log4js.configure({
  appenders: {
    info: { type: 'file', filename: './logs/info.log' },

  },
  categories: {
    default: { appenders: [ 'info'], level: 'info' }//去掉'out'。控制台不打印日志
  }
});

const logger = log4js.getLogger('info'); 

module.exports = logger