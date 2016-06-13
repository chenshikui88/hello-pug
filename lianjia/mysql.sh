create table `today` ( `date` char(20) character set utf8, `build` char(50) character set utf8, `bno` char(32) character set utf8, `square` char(16) character set utf8, `direct` char(8) character set utf8, `deal` char(128) character set utf8, `price` char(32) character set utf8, `view` int(10)) DEFAULT CHARSET=utf8;

select avg(price) from today where build like '金海岸%' and view>0;

cat build.txt | xargs -I {} echo nohup casperjs lj.js {} \&


