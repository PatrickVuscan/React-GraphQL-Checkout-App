#!/bin/bash

db=file:./test.db

function cleanup {
  echo `Removing {$db}`;
  rm ./prisma/test.db
  sed -i 's/provider = "sqlite"/provider = "postgresql"/g' ./prisma/schema.prisma
  yes | npx prisma migrate up --experimental && 
  npx prisma generate
}

function migrate_db {
  echo `Creating database {$db}...`
  sed -i 's/provider = "postgresql"/provider = "sqlite"/g' ./prisma/schema.prisma
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