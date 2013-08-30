#!/bin/sh
cd scripts
echo Generating public headers
./gen-public-headers.sh
node-gyp configure build
