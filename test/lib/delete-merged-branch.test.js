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

  describe('branch is merged', async () => {
    beforeEach(async () => {
      context.payload.pull_request.merged = true
      await deleteMergedBranch(context)
    })

    it('should call the deleteReference method', () => {
      expect(context.github.gitdata.deleteReference).toHaveBeenCalledWith({
        owner,
        ref: `heads/${ref}`,
        repo
      })
    })

    it('should log the delete', () => {
      expect(context.log.info).toBeCalledWith(`Successfully deleted ${owner}/${repo}/heads/${ref}`)
    })

    describe('deleteReference call fails', () => {
      beforeEach(async () => {
        context.github.gitdata.deleteReference = jest.fn().mockReturnValue(Promise.reject(new Error()))
        await deleteMergedBranch(context)
      })

      it('should log the error', () => {
        expect(context.log.warn).toBeCalledWith(expect.any(Error), `Failed to delete ${owner}/${repo}/heads/${ref}`)
      })
    })
  })

  describe('branch is NOT merged', () => {
    beforeEach(async () => {
      context.payload.pull_request.merged = false
      await deleteMergedBranch(context)
    })

    it('should log it didn\'t delete the branch', () => {
      expect(context.log.info).toBeCalledWith(`PR was closed but not merged. Keeping ${owner}/${repo}/heads/${ref}`)
    })

    it('should NOT call the deleteReference method', () => {
      expect(context.github.gitdata.deleteReference).not.toHaveBeenCalled()
    })
  })
})
