#!/bin/sh

cat build.txt | xargs -I {} echo nohup casperjs lj.js {} \&  > scrape.sh

./sql.sh > auto.sql

