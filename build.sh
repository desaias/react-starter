#! /bin/bash

touch yarn.lock

# Init empty cache file
if [ ! -f .yarn-cache.tgz ]; then
    echo "Init empty .yarn-cache-tgz"
    tar cvzf .yarn-cache.tgz --files-from /dev/null
fi

docker build . -t desaias/test:latest

docker run --rm --entrypoint cat desaias/test:latest /tmp/yarn.lock > /tmp/yarn.lock
if ! diff -q yarn.lock /tmp/yarn.lock > /dev/null   2>&1; then
    echo "Saving Yarn Cache"
    docker run --rm --entrypoint tar desaias/test:latest czf - /root/.yarn-cache/ > .yarn-cache.tgz
    echo "Saving  yarn.lock"
    cp /tmp/yarn.lock yarn.lock
fi

