#!/bin/bash

# Check what's installed, adapt the features accordingly
basedir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )  # Set working directory to the script directory. https://stackoverflow.com/a/246128


function is_installed {
    if [ -e "$basedir/app/$1/node_modules" ] ; then
        return 0  # return true
    else
        return 1  # return false
    fi
}

function _install_or_run_prompt {
    if [ $(is_installed $1) ] ; then
    echo "yeet"
    else
    echo "yeet"
    fi
}

function newterminal {
    # Implemented based on https://askubuntu.com/a/46630  && Mac os x solution from https://superuser.com/a/308460
    gnome-terminal -- "$@" || xterm -e "$@" || konsole -e "$@" || terminal -e "$@" || osascript -e "tell app \"Terminal\" to do script \"$@\"" || start "Powerful Personal Data" "C:/Program Files/Git/bin/sh.exe" -i -c "$@" || start "Powerful Personal Data" "C:/Program Files (x86)/Git/bin/sh.exe" -i -c "$@"   #|| start "" "cmd /C $@"#  osascript -e "tell app \"Terminal\" to do script \"$@\"" 
}

function selection_screen_option {
    # https://phoenixnap.com/kb/bash-math#ftoc-heading-15
    selection_screen_prompts+=("$1")
    selection_screen_actions+=("$2")
}

function selection_screen {
    clear
    echo "Welcome to Powerful Personal Data."
    echo ""
    echo ""

    index=0
    selection_screen_prompts=()
    selection_screen_actions=()
    #newterminal "echo yeet & sleep 5"

    if is_installed "svelte" ; then
        selection_screen_option "Run frontend on port 3333" "cd $basedir/app/svelte/ && npm run dev" #"newterminal cd \"$basedir/app/svelte/\" && npm run dev"
        selection_screen_option "Build frontend" "$newterminal cd $basedir/app/svelte/ && npm build"
    else
        selection_screen_option "Install Svelte frontend"
    fi
    #is_installed "svelte" "echo \"    [0] Install Svelte/frontend\"" "    [0] Install Svelte/frontend\""
    select opt in "${selection_screen_prompts[@]}" # https://askubuntu.com/a/1716
    do
        index="$REPLY-1" #https://stackoverflow.com/a/22714578
        action=${selection_screen_actions[$index]}
        echo $action

        $action &

        
        case "$opt" in
            "Run frontend on port 3333")
                $action
                ;;
            *)
                echo ""
                break
                ;;

        #$($action)
        esac
    done

    read -p "Select option: " option
    echo ${selection_screen_options[$option]}
    

   #     case "$dev" in
    #    0* ) chmod +x "$basedir/app/setup/setup-credentials.sh" && "$basedir/app/setup/setup-credentials.sh" & ;;
     #   * ) echo "No credentials will be set up!" ;;
      #  esac
}

svelte_installed=$(checkinstall "svelte")
spts_installed=$(checkinstall "solidpod-testserver")
backend_installed=$(checkinstall "backend")

selection_screen

echo ""
echo ""
echo ""



echo "THIS IS STILL THE OLD RUN.SH SCRIPT"
echo "This has been deprecated in favour of better installation methods through npm"
echo "Press ENTER to exit"
read
exit 0

# This file should allow the project to be setup & run in one line
# Not including global prerequisites (e.g. Node, Docker), but including requirements (e.g. CSS)

# ----- Setup Solid Community server -----

# Ensure the user is running from the projects root directory
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
