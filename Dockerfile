FROM node:10.11.0-alpine

LABEL "com.github.actions.name"="Delete merged branch"
LABEL "com.github.actions.description"="No more manually deleting merged branches, this lovely app does it for you."
LABEL "com.github.actions.icon"="archive"
LABEL "com.github.actions.color"="red"

LABEL "repository"="https://github.com/SvanBoxel/delete-merged-branch"
LABEL "homepage"="https://github.com/SvanBoxel"
LABEL "maintainer"="svboxel@gmail.com"


COPY ./lib /delete-merged-branch-action
COPY ./package.json /delete-merged-branch-action/package.json
COPY ./entrypoint.sh /delete-merged-branch-action/entrypoint.sh

ENV PATH=$PATH:/app/node_modules/.bin

WORKDIR /app
COPY . .
RUN npm install --production
ENTRYPOINT ["probot", "receive"]
CMD ["/app/index.js", "-p", "../workflow/event.json"]
