#!/bin/bash

mongod --dbpath ~/mongo-data-boilerplate &
sleep 10 
nodemon server ../server