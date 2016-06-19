var system = require('system');
var args = system.args;
var build = args[4];
var html = 'http://sz.58.com/ershoufang/'; // args[4] is first arg of this js
var date = new Date();
var path = "./";
var month = date.getMonth()+1;
var myfile = path + date.getFullYear() + '-' + month + '-' + date.getDate() +  ".txt";
var selector = '#bottom_google_ad';
var num;
var pages = new Array(99);

var casper = require('casper').create({
    logLevel: "debug",
    verbose: true
});
var fs = require('fs');

function getData() {
    casper.waitForSelector(selector);
    num = casper.evaluate(function getNumFromPage() {
        var data  = new Array();
        var table = document.getElementById('category').children[2].children[0]; // #infolist
        //.getElementById('main');//.getElementById('infolist');//.getElementsByClassName('tbimg')[0];
        var list  = table.getElementsByClassName('tbimg')[0].children[1]; // tbody
        var m = 0;
        for (var i=0; i<list.childElementCount; i++) {
            var one = list.children[i];
            var jjr = one.innerText;
            if (jjr.indexOf('经纪') > 0 || jjr.indexOf('室') < 0 || jjr.indexOf('房源更多') > 0)
                continue;
            //jjr = one.getElementsByClassName('t')[0].getElementsByClassName('qj-listleft')[0];
            data[m] = '[ ' + m + ' ]\n' + jjr + '\n';
            data[m] += one.getElementsByClassName('t')[0].getElementsByClassName('bthead')[0].getElementsByTagName('a')[0].getAttribute('href'); 
            m++;
        }
        return data;
    });
    //console.log(num);
    num.forEach(function debug5(para) {
        console.log(para);
        fs.write(myfile, para+'\n', 'a'); 
    });
};

casper.start(html);

casper.then(function debug() {
    for (var i=0; i<pages.length; i++) {
        var p = i + 14;
        pages[i] = 'pn' + p;
    }
});

casper.then(function debug3(){
    pages.forEach(function getLinks(url) {
        url = html + url;
        casper.thenOpen(url, function () {
            getData();
        });
    });
});

casper.run();

