#!/bin/bash

db=file:./test.db

function cleanup {
  echo `Removing {$db}`;
  rm ./prisma/test.db
}

function migrate_db {
  echo `Creating database {$db}...`
  yes | DATABASE_URL=$db npx prisma migrate up --experimental && 
  DATABASE_URL=$db npx prisma generate
  echo "DONE WITH MIGRATIONS"
}

function start_test_runner {
  migrate_db

  echo "Starting test runner..."
  DATABASE_URL=$db npx jest --coverage
  cleanup
}

start_test_runner