#!/bin/bash

echo "[STARTING] Mongo daemon..."
erroMongod=`mongod --dbpath ./mongo-data-boilerplate ` &

if [ "$?" != "0" ]; then
	echo "[ERROR] stating failed!" 1>&2 
	exit 1 
else 
	echo "[SUCCESS] stating ok!"
	sleep 3
fi

echo "[INSERTING] Default data in MongoDB..." 
erroInsert=`mongo  mongodb://localhost:27017/boilerplate ./databases/account-permissions.js > /dev/null`


if [ "$?" != "0" ]; then
	echo "[ERROR] iserting failed!" 1>&2
	exit 1
else
	echo "[SUCCESS] inserting ok!"
	sleep 3
fi

echo "[STARTING] Nodemon server..."
sleep 2

nodemon ../server.js
