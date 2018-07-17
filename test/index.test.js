const { Application } = require('probot')
const plugin = require('../index')
const deleteMergedBranch = require('../lib/delete-merged-branch')
const payload = require('./fixtures/pull-request.closed')

jest.mock('../lib/delete-merged-branch', () => jest.fn())

describe('Auto-delete-merged-branch ProBot Application', () => {
  let app
  let github

  beforeEach(() => {
    app = new Application()
    app.load(plugin)
    app.auth = () => Promise.resolve(github)
  })

  describe('Delete branch functionality', () => {
    describe('It does not receive the `pull_request.closed` event', () => {
      beforeEach(async () => {
        const event = 'pull_request.open'
        await app.receive({ event, payload })
      })

      it('should NOT call the deleteReference method', () => {
        expect(deleteMergedBranch).not.toHaveBeenCalled()
      })
    })

    describe('It receives the `pull_request.closed` event', () => {
      beforeEach(async () => {
        const event = 'pull_request.closed'
        await app.receive({ event, payload })
      })

      it('should call the deleteReference method', () => {
        expect(deleteMergedBranch).toHaveBeenCalled()
      })
    })
  })
})
