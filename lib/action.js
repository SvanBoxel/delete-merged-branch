const fs = require('fs');
const octokit = require('@octokit/rest')()
const deleteMergedBranch = require('./delete-merged-branch');

fs.readFile('/github/workflow/event.json', 'utf8', function(err, contents) {
  if (err) {
    throw err;
  }

  const payload = JSON.parse(contents);
  const context = { 
    payload: payload,
    log: console,
    github: octokit
  }

  if (payload.action === 'closed') {
    octokit.authenticate({
      type: 'token',
      token: process.env.GITHUB_TOKEN
    })

    return deleteMergedBranch(context)
  } 
  console.log('no closed event')
});
 
