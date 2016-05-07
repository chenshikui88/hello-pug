var html = 'http://weixin.sogou.com/weixin?type=1&query=wozaiqianhai&ie=utf8&_sug_=y&_sug_type_=';
var path = "./";
var myfile = path + ""; 
var selector = '#sogou_vr_11002301_box_0';
var href = "Not Ready.";
var wx   = 'http://mp.weixin.qq.com';
var num  = new Array();

var casper = require('casper').create({
    logLevel: "debug",
    verbose: true
});
var fs = require('fs');

function getData() {
    myfile = casper.getTitle().trim() + ".txt";
    casper.waitForSelector('#history');
    num = casper.evaluate(function getNumFromPage() {
        var table = document.getElementById('history');
        var list  = table.getElementsByClassName('weui_msg_card');
        var r = list.length;
        var data = new Array(r); 
        var head = 'http://mp.weixin.qq.com';
        
        for (var i=0/*skip title*/; i<r; i++) {
            data[i] = head + list[i].getElementsByClassName('weui_media_title')[0].getAttribute('hrefs');
        }
        return data; 
    });
    if (num) {
        num.forEach(function(param){
            fs.write(myfile, param+'\n', 'a'); 
        });
    }
};

function getDeal() {
    var content = casper.evaluate(function(){
        var p = document.getElementById('js_content').getElementsByTagName('p');
        var len = p.length;
        var data = "";
        var str1 = "建筑";
        var str2 = "面积";

        for (var i=0; i<len; i++) {
            if (p[i].innerText.indexOf(str1)<0 && p[i].innerText.indexOf(str2)<0) 
                continue;
            data += p[i].innerText + '\n';
        }
        return data; 
    }); 
    console.log(content);
    content.forEach(function(c){
        console.log(c+'\n');
    });
};

casper.start(html);

casper.then(function() {
    casper.waitForSelector(selector);
    href = casper.evaluate(function() {
        return document.getElementById('sogou_vr_11002301_box_0').getAttribute('href');
    });
});

casper.then(function (){
    casper.thenOpen(href, getData);
});

casper.then(function(){
        casper.thenOpen(num[0], function debug2(){
            casper.waitForSelector('#js_content');
        });
});
        casper.then(function debug3(){
            getDeal();
        });
/*
casper.then(function debug3(){
    num.forEach(function debug2(link){
        casper.then(function debug1(link){
            console.log(link);
            var lk = casper.evaluate(function(link) {
                return encodeURI(link);
            });
            console.log(lk);
        });
        casper.thenOpen(lk, function(){
            casper.waitForSelector('#js_content');
        });
        casper.then(function(){
            getDeal();
        });
    });
});
*/
casper.run();

