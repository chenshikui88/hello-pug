delete from qianhai where date is not null;
load data infile '/home/douglas/pybug/hello-pug/trunk/qianhai/data.utf8' into table qianhai FIELDS TERMINATED BY ' ';
select build,date,price from qianhai where build like '诺德%' order by date into outfile '/home/douglas/test1.txt';
select build,date,price from qianhai where build like '友邻%' order by date into outfile '/home/douglas/test2.txt';
select build,date,price from qianhai where build like '星海名城%' order by date into outfile '/home/douglas/test3.txt';
select build,date,price from qianhai where build like '中海%' order by date into outfile '/home/douglas/test4.txt';
select build,date,price from qianhai where build like '漾日湾畔%' order by date into outfile '/home/douglas/test5.txt';
 
