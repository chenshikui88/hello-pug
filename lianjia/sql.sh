#!/bin/sh

echo use test\;

echo delete from today where build is not null\;

echo load data infile \'/home/douglas/pybug/hello-pug/trunk/lianjia/data.utf8\' into table today FIELDS TERMINATED BY \' \'\;

cat build.txt | xargs -I {} echo select date,build,avg\(price\) from today where build like \'{}\%\' \&\& view\>0\;

