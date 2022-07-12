#!/bin/bash

# This file should allow the project to be setup & run in one line
# Not including global prerequisites (e.g. Node, Docker), but including requirements (e.g. CSS)

# ----- Setup Solid Community server -----

# Ensure the user is running from the projects root directory
basedir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )  # Set working directory to the script directory. https://stackoverflow.com/a/246128
cd $basedir
mkdir -p app/solid  # Directory to keep solid community server data

# Install all the dependencies of the web app project
npm install --prefix ./app/web

# Path to the bin executable of the communicaty solid server
css=app/web/node_modules/.bin/community-solid-server

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
    y|Y ) chmod +x "$basedir/app/setup/setup-credentials.sh" && "$basedir/app/setup/setup-credentials.sh" & ;;
    * ) echo "No credentials will be set up!" ;;
    esac
}

function newterminal {
    # Implemented based on https://askubuntu.com/a/46630
    gnome-terminal -- "$@" || xterm -e "$@" || konsole -e "$@" || terminal -e "$@" || start "" "cmd /C $@"
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

newterminal "npx parcel app/web/index.html"

cd $basedir

echo "Starting the solid community server..."
$css --config @css:config/file-no-setup.json --rootFilePath app/solid
