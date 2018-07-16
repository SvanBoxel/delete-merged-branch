const { Application } = require('probot')
const plugin = require('../index')
const payload = require('./fixtures/pull-request.closed')

describe('Auto-delete-merged-branch ProBot Application', () => {
  let app
  let github

  beforeEach(() => {
    // Here we create an `Application` instance
    app = new Application()
    // Here we initialize the app
    app.load(plugin)
    // This is an easy way to mock out the GitHub API
    github = {
      gitdata: {
        deleteReference: jest.fn().mockReturnValue(Promise.resolve({
          foo: 'bar'
        }))
      }
    }

    // Passes the mocked out GitHub API into out app instance
    app.auth = () => Promise.resolve(github)
  })

  describe('Delete branch functionality', () => {
    let event = null

    describe('It receives the `pull_request.closed` event', () => {
      beforeEach(() => {
        event = 'pull_request.closed'
      })

      it('should call the deleteReference method', async () => {
        await app.receive({ event, payload })
        expect(github.gitdata.deleteReference).toHaveBeenCalledWith({
          owner: payload.repository.owner.login,
          ref: `heads/${payload.pull_request.head.ref}`,
          repo: payload.repository.name
        })
      })
    })

    describe('It does not receive the `pull_request.closed` event', () => {
      beforeEach(() => {
        event = 'pull_request.open'
      })

      it('should NOT call the deleteReference method', async () => {
        await app.receive({ event, payload })
        expect(github.gitdata.deleteReference).not.toHaveBeenCalled()
      })
    })
  })
})
