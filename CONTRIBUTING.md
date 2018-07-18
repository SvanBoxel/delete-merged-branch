## Contributing

[fork]: /fork
[pr]: /compare
[style]: https://standardjs.com/
[code-of-conduct]: CODE_OF_CONDUCT.md

Hi there! We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

Please note that this project is released with a [Contributor Code of Conduct][code-of-conduct]. By participating in this project you agree to abide by its terms.

## Issues and PRs

If you have suggestions for how this project could be improved, or want to report a bug, open an issue! We'd love all and any contributions. If you have questions, too, we'd love to hear them.

We'd also love PRs. If you're thinking of a large PR, we advise opening up an issue first to talk about it, though! Look at the links below if you're not sure how to open a PR.

## Submitting a pull request
### First time contributors
We should encourage first time contributors. A good inspiration on this can be found [here](http://www.firsttimersonly.com/). As pointed out:

> If you are an OSS project owner, then consider marking a few open issues with the label first-timers-only. The first-timers-only label explicitly announces:

> "I'm willing to hold your hand so you can make your first PR. This issue is rather a bit easier than normal. And anyone who’s already contributed to open source isn’t allowed to touch this one!"

By labeling issues with this `first-timers-only` label we help first time contributors step up their game and start contributing.

### Pull request step-by-step guide

Good pull requests - patches, improvements, new features - are a fantastic
help. They should remain focused in scope and avoid containing unrelated
commits.

**Please ask first** before embarking on any significant pull request (e.g.
implementing features, refactoring code, porting to a different language),
otherwise you risk spending a lot of time working on something that the
project's developers might not want to merge into the project.

Please adhere to the coding conventions used throughout a project (indentation,
accurate comments, etc.) and any other requirements (such as test coverage).

Follow this process if you'd like your work considered for inclusion in the
project:

1. [Fork](http://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone git@github.com:SvanBoxel/delete-merged-branch.git
   # Navigate to the newly cloned directory
   cd delete-merged-branch
   # Assign the original repo to a remote called "upstream"
   git remote add upstream git@github.com:SvanBoxel/delete-merged-branch.git
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout <dev-branch>
   git pull upstream <dev-branch>
   ```

3. Create a new topic branch (off the master branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <issue-number>-<topic-branch-name>
   ```

   We recommend having an issue for every improvement you make. Please prepend your branch name with the issue number. eg. issue #381 related to a failing head image: `381-fix-header-image`

  
4. Commit your changes in logical chunks. Please adhere to these [AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y)
   or your code is unlikely be merged into the main project. Use Git's
   [interactive rebase](https://help.github.com/articles/interactive-rebase)
   feature to tidy up your commits before making them public.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream <dev-branch>
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description.

### Conventions of commit messages

Adding features on repo

```bash
git commit -m "feat: message about this feature"
```

Fixing features on repo

```bash
git commit -m "fix: message about this update"
```

Removing features on repo

```bash
git commit -m "refactor: message about this" -m "BREAKING CHANGE: message about the breaking change"
```

**IMPORTANT**: By submitting a patch, you agree to allow the project owner to license your work under the same license as that used by the project.

## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)
