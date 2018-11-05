const fs = require('fs');
const deleteMergedBranch = require('./delete-merged-branch');
fs.readFile('/github/workflow/event.json', 'utf8', function(err, contents) {
  const payload = JSON.parse(contents);
  const context = { 
    payload: payload
  }
  if (payload.action === 'closed') {
    return deleteMergedBranch(context)
  } 
  console.log('no closed event')
});
 
