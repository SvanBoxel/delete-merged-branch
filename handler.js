const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { serverless } = require('@probot/serverless-gcf')
const appFn = require('./index.js')

const client = new SecretManagerServiceClient();

const getSecret = async (key) => {
  const [version] = await client.accessSecretVersion({
    name: `projects/${process.env.PROJECT_ID}/secrets/${key}/versions/latest`,
  });

  const secretValue = version.payload.data.toString();
  return secretValue;
}

console.log(process.env.PROJECT_ID)
const main = () => {
  return async (request, response) => {
    if (request.body.action !== 'closed') return; // Only fetch secrets and execute if it makes sense
    
    const probot = serverless(appFn)
    process.env['WEBHOOK_SECRET'] = await getSecret('WEBHOOK_SECRET');
    process.env['APP_ID'] = await getSecret('APP_ID');
    process.env['PRIVATE_KEY'] = await getSecret('PRIVATE_KEY')
    return probot(request, response)
  }
}

module.exports.probot = main();