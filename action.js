const runProbot = require('probot-actions-adapter');
const app = require('./index');
runProbot(app);