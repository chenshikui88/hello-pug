var html = 'http://sz.lianjia.com/fangjia/';
var date = new Date();
var path = '/home/douglas/pybug/hello-pug/trunk/lianjia/'; 
var myfile = path + 'market.txt';
var selector = '#back-top';
var num;

var casper = require('casper').create({
    logLevel: "debug",
    verbose: true
});
var fs = require('fs');

function getData() {
    casper.waitForSelector(selector);
    data = casper.evaluate( function getDataFromPage() {
        var wrap = document.getElementsByClassName('box-l')[0];
        var block = wrap.getElementsByClassName('qushi-2')[0];
        //return block.innerText;
        var nearday = block.children[3];
        var selling = nearday.children[0].innerText.replace(/[^0-9]/ig, '');
        var sold = nearday.children[1].innerText.replace('90天','').replace(/[^0-9]/ig,'');
        //return selling + ' ' + sold;

        var bottom = wrap.getElementsByClassName('box-l-b')[0];
        //return bottom.innerText;
        var per = bottom.children[0].children[1].innerText;
        var lastmonth = bottom.children[1].children[1].innerText;
        var lastday = bottom.children[2].children[1].innerText;
        return selling + ' ' + sold + ' ' + lastmonth + ' ' + per + ' ' + lastday;
    });
    month = date.getMonth() + 1;
    param = date.getFullYear() + '.' + month + '.' + date.getDate();
    param = param + ' ' + data;
    console.log(param);
    fs.write(myfile, param+'\n', 'a'); 
};

casper.start(html);

casper.then(function debug3(){
    getData();
});

casper.run();

