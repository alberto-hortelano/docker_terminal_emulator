#!/bin/bash
cd `dirname "$0"`
pwd
gnome-terminal -e 'bash -c "sleep 0.1 && npm run build:sass"'
gnome-terminal -e 'bash -c "sleep 0.2 && npm run build:ts"'
gnome-terminal -e 'bash -c "sleep 3 && npm run build:wp"'
gnome-terminal -e 'bash -c "sleep 10 && npm run nodemon"'

