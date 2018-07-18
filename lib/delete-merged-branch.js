module.exports = async (context) => {
  const owner = context.payload.repository.owner.login
  const repo = context.payload.repository.name
  const ref = `heads/${context.payload.pull_request.head.ref}`

  if (!context.payload.merged) {
    context.log.info(`PR was closed but not merged. Keeping ${owner}/${repo}/${ref}`)
    return
  }

  try {
    await context.github.gitdata.deleteReference({ owner, repo, ref })
    context.log.info(`Successfully deleted ${owner}/${repo}/${ref}`)
  } catch (e) {
    context.log.warn(e, `Failed to delete ${owner}/${repo}/${ref}`)
  }
}
