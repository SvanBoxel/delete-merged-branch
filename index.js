const deleteMergedBranch = require('./lib/delete-merged-branch')

/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
module.exports = app => {
  app.log('Yay, the app was loaded!')
  app.on(`pull_request.closed`, deleteMergedBranch)
}
