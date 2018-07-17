const deleteMergedBranch = require('../../lib/delete-merged-branch')
const payload = require('../fixtures/pull-request.closed')

describe('deleteMergedBranch function', () => {
  let context
  let deleteReference
  let owner
  let ref
  let repo

  beforeEach(() => {
    deleteReference = jest.fn().mockReturnValue(Promise.resolve())
    context = {
      log: {
        info: jest.fn(),
        warn: jest.fn()
      },
      event: {
        event: 'pull_request.closed'
      },
      payload,
      github: {
        gitdata: {
          deleteReference
        }
      }
    }
    owner = payload.repository.owner.login
    ref = payload.pull_request.head.ref
    repo = payload.repository.name
  })

  it('should call the deleteReference method', async () => {
    await deleteMergedBranch(context)
    expect(context.github.gitdata.deleteReference).toHaveBeenCalledWith({
      owner,
      ref: `heads/${ref}`,
      repo
    })
  })

  it('should log the delete', async () => {
    await deleteMergedBranch(context)
    expect(context.log.info).toBeCalledWith(`Successfully deleted ${owner}/${repo}/heads/${ref}`)
  })

  describe('deleteReference call fails', () => {
    beforeEach(() => {
      context.github.gitdata.deleteReference = jest.fn().mockReturnValue(Promise.reject(new Error()))
    })

    it('should log the error', async () => {
      await deleteMergedBranch(context)
      expect(context.log.warn).toBeCalledWith(expect.any(Error), `Failed to delete ${owner}/${repo}/heads/${ref}`)
    })
  })
})
