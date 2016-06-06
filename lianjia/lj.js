var system = require('system');
var args = system.args;
var build = args[4];
var html = 'http://sz.lianjia.com/ershoufang/rs' + build; // args[4] is first arg of this js
var date = new Date();
var path = "./";
var myfile = path + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + '-' + build + ".txt";
var selector = '#house-lst';
var num  = new Array();
var pages = new Array(10);

var casper = require('casper').create({
    logLevel: "debug",
    verbose: true
});
var fs = require('fs');

function getData() {
    casper.waitForSelector(selector);
    num = casper.evaluate(function getNumFromPage() {
        var table = document.getElementById('house-lst');
        var list  = table.childNodes;
        var r = list.length;
        var data = new Array(r); 
        
        for (var i=0/*skip title*/; i<r; i++) {
            var now = new Date();
            var text = now.getFullYear() + "." + now.getMonth() + "." + now.getDate() + ' ';
            var panel = list[i].getElementsByClassName('info-panel')[0];
            var info = panel.childNodes[1];
            info = info.childNodes[0].children;
            for (var m=0; m<info.length; m++) {
                text += info[m].innerText.replace(/\s+/g,'') + ' ';
            }
            data[i] = text;

            info = panel.children[2];
            text = info.children[0].innerText + ' ' + info.children[1].innerText.replace(/\s+/g,'');
            data[i] += text + ' ';

            info = panel.children[3];
            text = info.children[0].children[0].innerText; 
            data[i] += text;
        }
        return data; 
    });
    if (num) {
        num.forEach(function(param){
            //console.log(param);
            fs.write(myfile, param+'\n', 'a'); 
        });
    }
};

casper.start(html);

casper.then(function getPages(){
    casper.waitForSelector('#matchid');
    pages = casper.evaluate(function (){
        var pid = document.getElementById('matchid');
        var list = pid.children[0].children[1].getElementsByClassName('page-box house-lst-page-box')[0];
        //return list.innerText;
        list = list.getElementsByTagName('a');
        var data = new Array(list.length);
        
        for (var m = 0; m < list.length; m++) {
            data[m] = list[m].getAttribute('href');
            var a = document.createElement('a');
            a.href = data[m];
            data[m] = a.href;
        }
        return data; 
    });
    //console.log(pages);
});

casper.then(function debug3(){
    pages.forEach(function getLinks(url) {
        console.log(url);
        casper.thenOpen(url, function () {
            getData()
        });
    });
});

casper.run();

