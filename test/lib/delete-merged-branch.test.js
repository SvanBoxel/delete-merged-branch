const deleteMergedBranch = require('../../lib/delete-merged-branch')
const payload = require('../fixtures/pull-request.closed')

describe('deleteMergedBranch function', () => {
  let context
  let deleteRef
  let owner
  let ref
  let repo

  beforeEach(() => {
    deleteRef = jest.fn().mockReturnValue(Promise.resolve())
    context = {
      config: jest.fn((_, defaults) => defaults),
      log: {
        info: jest.fn(),
        warn: jest.fn()
      },
      event: {
        event: 'pull_request.closed'
      },
      payload: JSON.parse(JSON.stringify(payload)), // Njeh...
      github: {
        git: {
          deleteRef
        }
      }
    }
    owner = payload.repository.owner.login
    ref = payload.pull_request.head.ref
    repo = payload.repository.name
  })

  describe('branch is merged from fork', () => {
    beforeEach(async () => {
      context.payload.pull_request.base.repo.id = 200
      context.payload.pull_request.head.repo.id = 100
      context.payload.pull_request.head.label = 'foo:bar'
      await deleteMergedBranch(context)
    })

    it('should log it didn\'t delete the branch', () => {
      expect(context.log.info).toBeCalledWith(`Closing PR from fork. Keeping ${context.payload.pull_request.head.label}`)
    })

    it('should NOT call the deleteReference method', () => {
      expect(context.github.git.deleteRef).not.toHaveBeenCalled()
    })
  })

  describe('branch is excluded in config', () => {
    it('should log it didn\'t delete the branch', async () => {
      context.config = jest.fn().mockReturnValue({ exclude: [context.payload.pull_request.head.ref] })
      context.payload.pull_request.head.label = 'foo:bar'
      await deleteMergedBranch(context)
      expect(context.log.info).toBeCalledWith(`Branch ${context.payload.pull_request.head.ref} excluded. Keeping ${context.payload.pull_request.head.label}`)
    })

    it('should NOT call the deleteReference method', async () => {
      context.config = jest.fn().mockReturnValue({ exclude: [context.payload.pull_request.head.ref] })
      context.payload.pull_request.head.label = 'foo:bar'
      await deleteMergedBranch(context)
      expect(context.github.git.deleteRef).not.toHaveBeenCalled()
    })

    describe('wildcard expression is used', () => {
      it('should check for wildcard in end of string', async () => {
        const branchWilcard = `${context.payload.pull_request.head.ref.substr(0, 8)}*`
        context.config = jest.fn().mockReturnValue({ exclude: ['test', branchWilcard] })
        context.payload.pull_request.head.label = 'bar:foo'
        await deleteMergedBranch(context)
        expect(context.log.info).toBeCalledWith(`Branch ${context.payload.pull_request.head.ref} excluded. Keeping ${context.payload.pull_request.head.label}`)
      })

      it('should check for wildcard in beginning of string', async () => {
        const branchWilcard = `*${context.payload.pull_request.head.ref.substr(1, 20)}`
        context.config = jest.fn().mockReturnValue({ exclude: ['test', branchWilcard] })
        context.payload.pull_request.head.label = 'bar:foobar'
        await deleteMergedBranch(context)
        expect(context.log.info).toBeCalledWith(`Branch ${context.payload.pull_request.head.ref} excluded. Keeping ${context.payload.pull_request.head.label}`)
      })
    })
  })

  describe('base not included in config', () => {
    it('should log it didn\'t delete the branch', async () => {
      context.config = jest.fn().mockReturnValue({
        exclude: [],
        on_base: ['something', 'other', 'than', 'the', 'base', 'branch']
      })
      context.payload.pull_request.head.label = 'foo:bar'
      await deleteMergedBranch(context)
      expect(context.log.info).toBeCalledWith(`Base does not match any 'on_base'. Keeping ${context.payload.pull_request.head.label}`)
    })

    it('should NOT call the deleteReference method', async () => {
      context.config = jest.fn().mockReturnValue({
        exclude: [],
        on_base: ['something', 'other', 'than', 'the', 'base', 'branch']
      })
      context.payload.pull_request.head.label = 'foo:bar'
      await deleteMergedBranch(context)
      expect(context.github.git.deleteRef).not.toHaveBeenCalled()
    })
  })

  describe.each([
    false,
    true
  ])('branch is merged', (baseExplicitlyIncluded) => {
    beforeEach(async () => {
      context.payload.pull_request.merged = true
      if (baseExplicitlyIncluded) {
        context.config.on_base = [context.payload.pull_request.base.ref]
      }
      await deleteMergedBranch(context)
    })

    it('should call the deleteReference method, base in on_base: ' + baseExplicitlyIncluded, () => {
      expect(context.github.git.deleteRef).toHaveBeenCalledWith({
        owner,
        ref: `heads/${ref}`,
        repo
      })
    })

    it('should log the delete, base in on_base: ' + baseExplicitlyIncluded, () => {
      expect(context.log.info).toBeCalledWith(`Successfully deleted ${owner}/${repo}/heads/${ref} which was merged`)
    })

    describe('deleteReference call fails, base in on_base: ' + baseExplicitlyIncluded, () => {
      beforeEach(async () => {
        context.github.git.deleteRef = ''
      })

      it('should log the error', async () => {
        expect(deleteMergedBranch()).rejects.toEqual(expect.any(Error))
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
      expect(context.github.git.deleteRef).not.toHaveBeenCalled()
    })
  })

  describe('branch is closed and not merged', () => {
    it('should log that it deleted closed branch', async () => {
      context.config = jest.fn().mockReturnValue({ delete_closed_pr: true, exclude: [] })
      context.payload.pull_request.merged = false
      await deleteMergedBranch(context)
      expect(context.log.info).toBeCalledWith(`Successfully deleted ${owner}/${repo}/heads/${ref} which was closed`)
    })
  })
})
