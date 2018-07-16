module.exports = async (context) => {
  const owner = context.payload.repository.owner.login
  const repo = context.payload.repository.name
  const ref = `heads/${context.payload.pull_request.head.ref}`
  const result = await context.github.gitdata.deleteReference({ owner, repo, ref })
  console.log(result)
}
