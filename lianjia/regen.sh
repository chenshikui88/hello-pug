#!/bin/sh

cat build.txt | xargs -I {} echo casperjs lj.js {} \&  > scrape.sh

./sql.sh > auto.sql

