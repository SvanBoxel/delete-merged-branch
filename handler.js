const { serverless } = require('@probot/serverless-gcf')
const appFn = require('./index.js')

module.exports.probot = serverless(appFn)
