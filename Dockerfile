FROM node:14

RUN npm install -g https://github.com/zenodraft/zenodraft#0.11.1

ENTRYPOINT ["zenodraft"]
