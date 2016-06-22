select * from qianhai;
show variables like 'character%';
delete from qianhai where date is not null;
load data infile '/home/douglas/pybug/hello-pug/trunk/qianhai/data.utf8' into table qianhai FIELDS TERMINATED BY ' ';
./mysql -u root -p test --default-character-set=utf8

ALTER TABLE table_name CHANGE old_field_name new_field_name field_type;

create database test default character set utf8;
create table `qianhai` ( `date` datetime character set utf8, `build` char(50) character set utf8, `bno` char(32) character set utf8, `no` char(16) character set utf8, `floor` char(16) character set utf8, `square` char(16) character set utf8, `type` char(32) character set utf8, `direct` char(8) character set utf8, `deal` char(128) character set utf8, `price` char(32) character set utf8) DEFAULT CHARSET=utf8;

最简单的完美修改方法，修改mysql的my.cnf文件中的字符集键值（注意配置的字段细节）：
1、在[client]字段里加入default-character-set=utf8，如下：
[client]
port = 3306
socket = /var/lib/mysql/mysql.sock
default-character-set=utf8

2、在[mysqld]字段里加入character-set-server=utf8，如下：

[mysqld]
port = 3306
socket = /var/lib/mysql/mysql.sock
character-set-server=utf8

3、在[mysql]字段里加入default-character-set=utf8，如下：

[mysql]
no-auto-rehash
default-character-set=utf8

修改完成后，service mysql restart重启mysql服务就生效。注意：[mysqld]字段与[mysql]字段是有区别的。这点在网上没人反馈过。

使用SHOW VARIABLES LIKE ‘character%’;查看，发现数据库编码全已改成utf8。

+--------------------------+----------------------------+
| Variable_name | Value |
+--------------------------+----------------------------+
| character_set_client | utf8 |
| character_set_connection | utf8 |
| character_set_database | utf8 |
| character_set_filesystem | binary |
| character_set_results | utf8 |
| character_set_server | utf8 |
| character_set_system | utf8 |
| character_sets_dir | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+


4、如果上面的都修改了还乱码，那剩下问题就一定在connection连接层上。解决方法是在发送查询前执行一下下面这句（直接写在SQL文件的最前面）：
SET NAMES 'utf8';
它相当于下面的三句指令：
SET character_set_client = utf8;
SET character_set_results = utf8;
SET character_set_connection = utf8;
