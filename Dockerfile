FROM node:10.16.0-alpine

LABEL "com.github.actions.name"="Delete merged branch"
LABEL "com.github.actions.description"="No more manually deleting merged branches, this lovely app does it for you."
LABEL "com.github.actions.icon"="archive"
LABEL "com.github.actions.color"="red"

LABEL "repository"="https://github.com/SvanBoxel/delete-merged-branch"
LABEL "homepage"="https://github.com/SvanBoxel"
LABEL "maintainer"="svboxel@gmail.com"

ENV PATH=$PATH:/app/node_modules/.bin

WORKDIR /app
# These are the only relevant files to the 'yarn install' step. Adding anything
# more will invalidate the docker cache more often than necessary. Over
# multiple docker builds this will improve build time.
COPY package.json yarn.lock /app/
RUN yarn install --production
COPY . .

ENTRYPOINT ["probot", "receive"]
CMD ["/app/index.js"]
