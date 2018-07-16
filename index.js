/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on(`pull_request.closed`, async context => {
    const owner = context.payload.repository.owner.login
    const repo = context.payload.repository.name
    const ref = `heads/${context.payload.pull_request.head.ref}`
    console.log({ owner, repo, ref })

    const result = await context.github.gitdata.deleteReference({ owner, repo, ref })
    console.log(result)
    // return context.github.issues.createComment(params)
  })
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
