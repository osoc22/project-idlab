#!/bin/bash

# This file should allow the project to be setup & run in one line
# Not including global prerequisites (e.g. Node, Docker), but including requirements (e.g. CSS)

# ----- Setup Solid Community server -----

# Ensure the user is running from the projects root directory
basedir=$(dirname $(realpath -s "$0"))  # Set working directory to the script directory, implemented from https://stackoverflow.com/a/11114547
cd $basedir
mkdir -p app/solid  # Directory to keep solid community server data

css=node_modules/.bin/community-solid-server

# Install solid-community-server if needed
echo "Setting up solid-community-server..."
if ! command -v $css ; then
    npm install --location=project @solid/community-server
fi
echo "Solid community server set up!"

function devsetup {
    echo ""
    echo ""
    echo "--------------------"
    echo ""
    echo ""
    echo "Dev/testing setup?"
    echo "This includes automatic pod & credential creation"
    echo "This is meant for development & testing should not be done in case of production!"
    # Prompt solution implemented from https://stackoverflow.com/a/1885670
    read -p "Setup for testing? (y/n) [n]: " dev
    case "$dev" in
    y|Y ) "$basedir/app/setup/setup-credentials.sh" & ;;
    * ) echo "No credentials will be set up!" ;;
    esac
}

if [ ! -e "tools/Bashlib/bashlib/css/bin/" ] ; then
    echo "Setting up bashlib..."
    git clone https://github.com/Denperidge/Bashlib.git tools/Bashlib
    cd tools/bashlib
    ./setup.sh
    echo "Bashlib set up!"
    cd $basedir

    # If Bashlib has not been set up, it can be assumed this is first run 
    # Thus, check whether there should be automated pod & credential creation  
    devsetup
fi

# If the script gets launched with the "dev" argument, run the credential setup
if [[ "$1" == "dev" ]]; then
    devsetup
fi

cd $basedir
$css --config @css:config/file-no-setup.json --rootFilePath app/solid

