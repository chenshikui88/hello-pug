use test;
delete from today where build is not null;
load data infile '/home/douglas/pybug/hello-pug/trunk/lianjia/data.utf8' into table today FIELDS TERMINATED BY ' ';
select date,build,avg(price) from today where build like '海岸明珠%' && view>0;
select date,build,avg(price) from today where build like '海月花园%' && view>0;
select date,build,avg(price) from today where build like '漾日湾畔%' && view>0;
select date,build,avg(price) from today where build like '碧海天家园%' && view>0;
select date,build,avg(price) from today where build like '缤纷假日豪园%' && view>0;
select date,build,avg(price) from today where build like '蔚蓝海岸%' && view>0;
select date,build,avg(price) from today where build like '金海岸大厦%' && view>0;
select date,build,avg(price) from today where build like '青春家园%' && view>0;
select date,build,avg(price) from today where build like '鸿瑞花园%' && view>0;
select date,build,avg(price) from today where build like '鼎太风华%' && view>0;
