#!/bin/sh
cd scripts
echo Generating public headers
./gen-public-headers.sh
cd ..
node-gyp configure build
