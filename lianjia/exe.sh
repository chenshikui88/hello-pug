#!/bin/sh

cat 2016-6-17*.txt > data.utf8

/opt/lampp/bin/mysql -N -uroot -p123456 -Dtest < auto.sql 

