#!/bin/bash

npm install

cp -r ./prism ./dist/prisma 
cp  ./env ./dist/.env
cp -r ./node_modules ./dist/node_modules