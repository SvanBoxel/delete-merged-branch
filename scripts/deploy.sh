#!/bin/sh
now="npx now --debug --token=$NOW_TOKEN"

echo "$ now rm --safe --yes delete-merged-branch"
$now rm --safe --yes delete-merged-branch

echo "$ now --public"
$now --public

echo "$ now alias"
$now alias
