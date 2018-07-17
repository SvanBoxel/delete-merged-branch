const deleteMergedBranch = require('./lib/delete-merged-branch')

module.exports = app => {
  app.log('Loaded delete-merged-branch GitHub Application')
  app.on(`pull_request.closed`, deleteMergedBranch)
}
