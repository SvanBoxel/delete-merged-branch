# Delete merged branch
[![Build Status](https://travis-ci.com/SvanBoxel/delete-merged-branch.svg?token=BrByTtLgfVKqDJ6GzD2p&branch=master)](https://travis-ci.com/SvanBoxel/delete-merged-branch)
_Want to see more badges? [Click here](#badges)!_


_Want to run this app with [GitHub Actions](https://github.com/features/actions)? [Click here](#running-in-github-actions)_

A GitHub app built with [Probot](https://github.com/probot/probot) that automatically deletes a branch after it's merged. That's it, enjoy! 

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

## Running with Docker

1. Make sure you have docker installed.

2. Follow the same steps as running locally to set up the GitHub app and
   environment files.

3. Build the docker image:

   ```sh
   docker build -t delete-merged-branch .
   ```

4. Run the docker image:

   ```sh
   docker run -i -t --rm \
       -v "$(pwd)/.env:/app/.env" \
       -p 3000:3000 \
       delete-merged-branch
   ```

Alternate Example: Running test in the docker image

```sh
docker run -i -t --rm \
    -v "$(pwd)/.env:/app/.env" \
    -v "$(pwd)/sample-data:/sample-data" \
    delete-merged-branch \
        receive /app/index.js -p /sample-data/event.json
```

## How it works
This GitHub app listens to the `pull_request.closed` webhook. If a pull request is closed and the connected branch is merged, it will delete the branch.

## Configuration
The optional app configuration YAML file should be saved as `.github/delete-merged-branch-config.yml`. At the moment it supports the following options:

- `exclude` _(array)_ - list of branches that should not be automatically deleted after a merge. Wildcards supported.

Example `.github/delete-merged-branch-config.yml`:

```
exclude: 
  - development
  - qa
  - feature-*
```

## Release process
CI (Travis) is in charge of releasing new versions of the GitHub Application to [Now](https://zeit.co/now). On every new commit to master we run [semantic-release](https://github.com/semantic-release/semantic-release) to determine whether the major/minor/patch version should be incremented. If so, we update the version running in production.

## Running in GitHub actions
This app is compatible with [GitHub Actions](https://github.com/features/actions). You need to create a workflow that is triggered on the `pull_request` event for this. Then, you use this repo for the action. (`SvanBoxel/delete-merged-branch@master`). Don't forget to check the `GITHUB_TOKEN` secret. That's it.

![Delete merged branch action](https://user-images.githubusercontent.com/24505883/48064765-14e49180-e1c9-11e8-9fa5-151bf5783b5c.png)

## Contributing

If you have suggestions for how this GitHub app could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2018 Sebass van Boxel <hello@svboxel.com>

## Badges
[![Build Status](https://travis-ci.com/SvanBoxel/delete-merged-branch.svg?token=BrByTtLgfVKqDJ6GzD2p&branch=master)](https://travis-ci.com/SvanBoxel/delete-merged-branch)
[![codecov](https://codecov.io/gh/SvanBoxel/delete-merged-branch/branch/master/graph/badge.svg)](https://codecov.io/gh/SvanBoxel/delete-merged-branch)
![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m780713473-6281c6fa7a94950835bfea39.svg)
[![Greenkeeper badge](https://badges.greenkeeper.io/SvanBoxel/delete-merged-branch.svg?token=f5b0c3f23f4ab216a26c3c3559453a514b321c54b14aed881e543a5969eeca62&ts=1531752685299)](https://greenkeeper.io/)
[![Project maintainability](https://sonarcloud.io/api/project_badges/measure?project=SvanBoxel_delete-merged-branch&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=SvanBoxel_delete-merged-branch)
[![npm version](https://badge.fury.io/js/delete-merged-branch.svg)](https://www.npmjs.com/package/delete-merged-branch)
