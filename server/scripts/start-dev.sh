#!/bin/bash

mongod --dbpath ~/mongo-data-boilerplate &
sleep 5 
sh ./database/populate-account-permissions.sh
sleep 5 
nodemon server ../server