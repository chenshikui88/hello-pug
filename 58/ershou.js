var system = require('system');
var args = system.args;
var build = args[4];
var html = 'http://sz.58.com/ershoufang/'; // args[4] is first arg of this js
var date = new Date();
var path = "./";
var month = date.getMonth()+1;
var myfile = path + date.getFullYear() + '-' + month + '-' + date.getDate() +  ".txt";
var selector = '#house-area';
var num;
var pages = new Array(2);

var casper = require('casper').create({
    logLevel: "debug",
    verbose: true
});
var fs = require('fs');

function getData() {
    casper.waitForSelector(selector);
    num = casper.evaluate(function getNumFromPage() {
        var table = document.getElementById('category').children[2].children[0]; // #infolist
        //.getElementById('main');//.getElementById('infolist');//.getElementsByClassName('tbimg')[0];
        var list  = table.children[1].children[1]; // tbody
        //return list;
        var data  = new Array();
        var m = 0;
        for (var i=0; i<list.childElementCount; i++) {
            var one = list.children[i].children[1].children[1];
            var jjr = one.getElementsByClassName('qj-listjjr')[0].innerText;
            //if (jjr.indexOf('经纪') > 0)
            //    continue;
            //data[m++] = one.children[1].children[0].children[0].getAttribute('a'); 
            data[m++] = jjr;
        }
        return data;
    });
    if (null == num)
        return;
    num.forEach(function debug5(para) {
        //console.log(para);
        fs.write(myfile, para+'\n', 'a'); 
    });
};

casper.start(html);

casper.then(function debug() {
    for (var i=0; i<pages.length; i++) {
        var p = i;
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

