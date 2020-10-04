const { serverless } = require('@probot/serverless-gcf')
const appFn = require('./index.js')

const client = new SecretManagerServiceClient();

module.exports.probot = serverless(appFn);