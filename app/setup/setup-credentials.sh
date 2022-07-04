bashlib="tools/Bashlib/bashlib/css/bin/"
blcss="node $bashlib/css.js"
blsolid="node $bashlib/solid.js"
blauth="node $bashlib/solid.js --auth interactive --idp"

echo "Setting up test credentials..."
echo

sleep 10  # Give the server some time to start up

$blcss create-pod -b
