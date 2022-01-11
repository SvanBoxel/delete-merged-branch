const shouldClosePrByDefault = () => {
  return !!process.env.DELETE_CLOSED_PR
}

module.exports = async (context) => {
  const config = await context.config('delete-merged-branch-config.yml', { exclude: [], on_base: [], delete_closed_pr: shouldClosePrByDefault() })
  const headRepoId = context.payload.pull_request.head.repo.id
  const baseRepoId = context.payload.pull_request.base.repo.id

  const owner = context.payload.repository.owner.login
  const repo = context.payload.repository.name
  const branchName = context.payload.pull_request.head.ref
  const baseBranchName = context.payload.pull_request.base.ref

  const ref = `heads/${branchName}`

  if (headRepoId !== baseRepoId) {
    context.log.info(`Closing PR from fork. Keeping ${context.payload.pull_request.head.label}`)
    return
  }

  if (config.on_base && config.on_base.length > 0 &&
      !config.on_base.some((rule) => new RegExp(`^${rule.split('*').join('.*')}$`).test(baseBranchName))) {
    context.log.info(`Base does not match any 'on_base'. Keeping ${context.payload.pull_request.head.label}`)
    return
  }

  if (config.exclude.some((rule) => new RegExp(`^${rule.split('*').join('.*')}$`).test(branchName))) {
    context.log.info(`Branch ${branchName} excluded. Keeping ${context.payload.pull_request.head.label}`)
    return
  }

  const isMerged = context.payload.pull_request.merged
  if (!isMerged && config.delete_closed_pr === false) {
    context.log.info(`PR was closed but not merged. Keeping ${owner}/${repo}/${ref}`)
    return
  }

  try {
    await context.github.git.deleteRef({ owner, repo, ref })
    context.log.info(`Successfully deleted ${owner}/${repo}/${ref} which was ${isMerged ? 'merged' : 'closed'}`)
  } catch (e) {
    context.log.warn(e, `Failed to delete ${owner}/${repo}/${ref}`)
    throw e
  }
}
