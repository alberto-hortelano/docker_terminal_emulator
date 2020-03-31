#!/bin/bash
cd `dirname "$0"`
function run_npm_commands() {
	gnome-terminal -e 'bash -c "echo \"build:sass\"; sleep 0.1 && npm run build:sass"'
	gnome-terminal -e 'bash -c "echo \"build:ts\"; sleep 0.2 && npm run build:ts"'
	gnome-terminal -e 'bash -c "echo \"build:wp\"; sleep 3 && npm run build:wp"'
	gnome-terminal -e 'bash -c "echo \"nodemon\"; sleep 10 && npm run nodemon"'
}
function handle_event() {
    local entry="$1"
    local action=$(echo $entry | jq -r '.action')
    local service=$(echo $entry | jq -r '.service')
    if [ "$service" == "mongo" ] && [ "$action" == "start" ]; then
        run_npm_commands
		echo "finished"
    fi
}
if [ "$(docker ps -q -f name=mongo)" ]; then
    run_npm_commands
else
    gnome-terminal -e 'bash -c "echo \"docker-compose\" && docker-compose down && docker-compose up"'
    # Rebuild image:
    #gnome-terminal -e 'bash -c "docker-compose down && docker-compose up --force-recreate --build"'
    docker-compose events --json | (
        while read event; do
            finished=$(handle_event "$event")
		    if [ "$finished" == "finished" ]; then
			    exit
		    fi
        done
    )
fi
