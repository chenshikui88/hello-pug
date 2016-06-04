var html = 'http://sz.lianjia.com/fangjia/';
var date = new Date();
var path = "./";
var myfile = path + 'market.txt';
var selector = '#wrapperCon';
var num;

var casper = require('casper').create({
    logLevel: "debug",
    verbose: true
});
var fs = require('fs');

function getData() {
    casper.waitForSelector(selector);
    data = casper.evaluate( function getDataFromPage() {
        var wrap = document.getElementById('wrapperCon');
        var block = wrap.getElementsByClassName('turnover-con clear')[0];
        var main = block.children[0];
        //return main.innerText;
        var last = main.children[0].children[0].children[0];
        var city = last.children[0];
        var nearday = last.children[1].children[1].getElementsByClassName('nearday')[0];
        var selling = nearday.children[0].innerText.replace(/[^0-9]/ig, '');
        //return city.innerText + nearday.innerText + selling;
        var sold = nearday.children[1].innerText.replace('90天','').replace(/[^0-9]/ig,'');
        var bottom = block.children[0].children[1];
        //return bottom.innerText;
        var per = bottom.children[0].children[1].innerText;
        var lastmonth = bottom.children[2].children[1].innerText;
        var lastday = bottom.children[4].children[1].innerText;
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

