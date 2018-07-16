const deleteMergedBranch = require('./lib/delete-merged-branch')

module.exports = app => {
  app.log('Yay, the app was loaded!')
  app.on(`pull_request.closed`, deleteMergedBranch)
}
