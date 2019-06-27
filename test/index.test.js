const { Probot } = require('probot')
const plugin = require('../index')
const deleteMergedBranch = require('../lib/delete-merged-branch')
const payload = require('./fixtures/pull-request.closed')

jest.mock('../lib/delete-merged-branch', () => jest.fn())

describe('Auto-delete-merged-branch ProBot Application', () => {
  let probot

  beforeEach(() => {
    probot = new Probot({})
    const app = probot.load(plugin)
    app.app = { getSignedJsonWebToken: () => 'test' }
  })

  describe('Delete branch functionality', () => {
    describe('It does not receive the `pull_request.closed` event', () => {
      beforeEach(async () => {
        const name = 'pull_request'
        await probot.receive({
          name,
          payload: {
            ...payload,
            action: 'opened',
          },
        })
      })

      it('should NOT call the deleteReference method', () => {
        expect(deleteMergedBranch).not.toHaveBeenCalled()
      })
    })

    describe('It receives the `pull_request.closed` event', () => {
      beforeEach(async () => {
        const name = 'pull_request'
        await probot.receive({ name, payload })
      })

      it('should call the deleteReference method', () => {
        expect(deleteMergedBranch).toHaveBeenCalled()
      })
    })
  })
})
