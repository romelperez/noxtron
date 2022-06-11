#!/bin/sh

rm -rf ./build

mkdir -p ./build/noxtron/sandbox/

cp -rp ../../build/umd/ ./build/noxtron/umd/
cp -p ./src/playground/playground.html ./build/noxtron/index.html
cp -p ./src/sandbox/sandbox.html ./build/noxtron/sandbox/index.html
