const deleteMergedBranch = require('./lib/delete-merged-branch')

module.exports = app => {
  const { APP_ID, WEBHOOK_SECRET, PRIVATE_KEY } = process.env
  console.log(555, APP_ID, WEBHOOK_SECRET, PRIVATE_KEY);

  app.log('Loaded delete-merged-branch GitHub Application')
  app.on('pull_request.closed', deleteMergedBranch)
}
