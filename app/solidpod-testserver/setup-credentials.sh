#!/bin/bash
bashlib="tools/Bashlib/bashlib/css/bin"
blcss="node $bashlib/css.js"
blsolid="node $bashlib/solid.js"
blauth="node $bashlib/solid.js --auth interactive --idp"

echo "Dev/testing setup?"
echo "This includes automatic pod & credential creation"
echo "This is meant for development & testing should not be done in case of production!"
# Prompt solution implemented from https://stackoverflow.com/a/1885670
read -p "Setup for testing? (y/n) [n]: " dev
case "$dev" in
y|Y ) echo "Setting up test credentials..." ;;
* ) echo "No credentials will be set up!" && exit 0 ;;
esac


if [ ! -e "tools/Bashlib/bashlib/css/bin/" ] ; then
    echo "Setting up bashlib..."
    git clone https://github.com/Denperidge/Bashlib.git tools/Bashlib
    pushd tools/bashlib
    ./setup.sh
    echo "Bashlib set up!"
    popd
fi

function newterminal {
    # Implemented based on https://askubuntu.com/a/46630
    gnome-terminal -- "$@" || xterm -e "$@" || konsole -e "$@" || terminal -e "$@" || start "" "cmd /C $@"
}

# Solution based off https://stackoverflow.com/a/57433225 & https://unix.stackexchange.com/a/196552
if curl -fs -LI -o /dev/null localhost:3000 > /dev/null ; 
then 
    echo "Server already started, continuing..."; 
else 
    echo "Starting server..."; 
    npm start &
    sleep 20
fi


$blcss create-pod -b "http://localhost:3000/" -n johndoe -e johndoe@localhost.be -p johndoe

kill $!