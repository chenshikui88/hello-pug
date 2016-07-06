var html = 'http://sz.58.com/nanshan/ershoufang/'; // args[4] is first arg of this js
var date = new Date();
var path = "/home/douglas/pybug/hello-pug/trunk/58/";
var month = date.getMonth()+1;
var myfile = path + date.getFullYear() + '-' + month + '-' + date.getDate() + '-' + date.getHours() +  ".txt";
var selector = '#bottom_google_ad';
var num;
var pages = new Array(99);

var casper = require('casper').create({
    logLevel: "debug",
    verbose: true
});
var fs = require('fs');

function getData() {
    //casper.wait(3000);
    casper.waitForSelector(selector);
    num = casper.evaluate(function getNumFromPage() {
        var data  = new Array();
        var table = document.getElementById('category').children[2].children[0]; // #infolist
        //.getElementById('main');//.getElementById('infolist');//.getElementsByClassName('tbimg')[0];
        var list  = table.getElementsByClassName('tbimg')[0].children[1]; // tbody
        var m = 0;
        var n = 0;
        for (var i=0; i<list.childElementCount; i++) {
            var one = list.children[i];
            var jjr = one.innerText;
            if (jjr.indexOf('经纪') > 0 || jjr.indexOf('室') < 0 || jjr.indexOf('房源更多') > 0) {
                n++;
                continue;
            }
            var price = one.getElementsByClassName('t')[0].getElementsByClassName('qj-listright btall')[0].getElementsByClassName('pri')[0].innerText.trim();
            //if (parseInt(price) < 400) // skip < 2000 thousands 
            //    continue;
            
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
        var p = i + 1;
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

