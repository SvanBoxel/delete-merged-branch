console.log('running')

var fs = require('fs');
 
fs.readFile('/github/workflow/event.json', 'utf8', function(err, contents) {
    console.log(contents);
});
 
console.log('done');
