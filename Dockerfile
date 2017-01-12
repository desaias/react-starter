FROM desaias/alpine-apk-node-yarn

MAINTAINER Dave <git@davidesaias.com>


ADD package.json yarn.lock .yarnrc /tmp/


# Copy cache contents (if any) from local machine
ADD .yarn-cache.tgz /tmp/


# Install Packages
RUN cd /tmp && yarn --ignore-engines


# Build production code
RUN mkdir -p /opt/app \
    && cd /opt/app \
    && ln -s /tmp/node_modules


# Copy the code
ADD . /opt/app


RUN yarn build

