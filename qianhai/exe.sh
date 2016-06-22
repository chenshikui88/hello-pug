#!/bin/sh

cat *.doc > data.utf8

/opt/lampp/bin/mysql -N -uroot -p123456 -Dtest < auto.sql 

