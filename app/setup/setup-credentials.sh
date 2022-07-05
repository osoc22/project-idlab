#!/bin/bash
basedir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )../../  # Set working directory to the script directory. https://stackoverflow.com/a/246128
bashlib="$basedir/tools/Bashlib/bashlib/css/bin"
blcss="node $bashlib/css.js"
blsolid="node $bashlib/solid.js"
blauth="node $bashlib/solid.js --auth interactive --idp"

echo "Setting up test credentials..."
echo

sleep 10  # Give the server some time to start up

$blcss create-pod -b "http://localhost:3000/" -n johndoe -e johndoe@localhost.be -p johndoe
