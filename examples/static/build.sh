#!/bin/sh

rm -rf ./build

cp -rp ./static ./build
cp -rp ../../build/umd ./build/noxtron/umd
