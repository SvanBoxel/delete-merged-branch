![delete-merged-branch](https://socialify.git.ci/SvanBoxel/delete-merged-branch/image?description=1&font=KoHo&forks=1&issues=1&language=1&pattern=Signal&pulls=1&stargazers=1&theme=Dark)

# Delete merged branch

[![Build Status](https://github.com/SvanBoxel/delete-merged-branch/workflows/Test%20bot%20e2e/badge.svg)](https://github.com/SvanBoxel/delete-merged-branch/actions)
_Want to see more badges? [Click here](#badges)!_


_Want to run this app with [GitHub Actions](https://github.com/features/actions)? [Click here](#running-in-github-actions)_

A GitHub app built with [Probot](https://github.com/probot/probot) that automatically deletes a branch after it's merged. That's it, enjoy! 

### 🔔 Wait, do you really need this? 🔔
You may not need this app as GitHub [recently added this feature](https://github.blog/changelog/2019-07-31-automatically-delete-head-branches-of-pull-requests/) natively to their platform. It allows you to automatically delete the head branch after a merge. If you need more advanced controls and configuration settings, this app is still well suited for the job. 


## Running it locally
1. First, follow [these instructions](https://probot.github.io/docs/development/#configure-a-github-app) for making your own GitHub app.
    1. Give your app the following permissions:
          - Repository contents: Read & Write.
          - Pull requests: Read
    2. And Subscribe to the following events
          - Pull Request

2. Then, clone the repo:
```sh
git clone git@github.com:SvanBoxel/delete-merged-branch.git
```

3. Copy `.env.example` to `.env` and set the right environment variables as [here](https://probot.github.io/docs/configuration/)

4. Now, install app dependencies and run it:

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## How it works
This GitHub app listens to the `pull_request.closed` webhook. If a pull request is closed and the connected branch is merged, it will delete the branch.

## Configuration
The optional app configuration YAML file should be saved as `.github/delete-merged-branch-config.yml`. At the moment it supports the following options:

- `exclude` _(array)_ - list of branches that should not be automatically deleted after a merge. Wildcards supported.
- `delete_closed_pr` _(bool)_ whether or not a branch should be deleted if PR is closed without merging

Example `.github/delete-merged-branch-config.yml`:

```
exclude: 
  - development
  - qa
  - feature-*
delete_closed_pr: true
```

## Release process
CI (GitHub Actions) is in charge of releasing new versions of the GitHub App to [Google Cloud Platform](https://cloud.google.com). On every new commit to master we run [semantic-release](https://github.com/semantic-release/semantic-release) to determine whether the major/minor/patch version should be incremented. If so, we update the version running in production.

## Running in GitHub actions
This app is compatible with [GitHub Actions](https://github.com/features/actions). You need to create a workflow that is triggered on the `pull_request` event for this. Then, you use this repo for the action. (`SvanBoxel/delete-merged-branch@master`). Don't forget to check the `GITHUB_TOKEN` secret. That's it.

```yml
name: delete branch on close pr
on: 
  pull_request:
    types: [closed]
  
jobs:
  delete-branch:
    runs-on: ubuntu-latest
    steps:
      - name: delete branch
        uses: SvanBoxel/delete-merged-branch@main
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Contributing

If you have suggestions for how this GitHub app could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2018 Sebass van Boxel <hello@svboxel.com>

## Badges
[![Build Status](https://github.com/SvanBoxel/delete-merged-branch/workflows/Test%20bot%20e2e/badge.svg)](https://github.com/SvanBoxel/delete-merged-branch/actions)
[![codecov](https://codecov.io/gh/SvanBoxel/delete-merged-branch/branch/master/graph/badge.svg)](https://codecov.io/gh/SvanBoxel/delete-merged-branch)
[![Greenkeeper badge](https://badges.greenkeeper.io/SvanBoxel/delete-merged-branch.svg?token=f5b0c3f23f4ab216a26c3c3559453a514b321c54b14aed881e543a5969eeca62&ts=1531752685299)](https://greenkeeper.io/)
[![Project maintainability](https://sonarcloud.io/api/project_badges/measure?project=SvanBoxel_delete-merged-branch&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=SvanBoxel_delete-merged-branch)
[![npm version](https://badge.fury.io/js/delete-merged-branch.svg)](https://www.npmjs.com/package/delete-merged-branch)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/SvanBoxel/delete-merged-branch.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/SvanBoxel/delete-merged-branch/alerts/)
