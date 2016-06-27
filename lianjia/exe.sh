#!/bin/sh

cat 2016-6-21*.txt > data.utf8

/opt/lampp/bin/mysql -N -uroot -p123456 -Dtest < auto.sql 

