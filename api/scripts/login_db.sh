#!/bin/bash
psql "$(grep 'DATABASE_URL' ./prisma/.env | cut -d '=' -f2)"