#!/bin/sh

cat build.txt | xargs -I {} echo casperjs /home/douglas/pybug/hello-pug/trunk/lianjia/lj.js {}\;sleep 1  > scrape.sh

./sql.sh > auto.sql

