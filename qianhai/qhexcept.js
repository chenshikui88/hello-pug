var html = 'http://weixin.sogou.com/weixin?type=1&query=wozaiqianhai&ie=utf8&_sug_=y&_sug_type_=';
var thisurl = 'http://mp.weixin.qq.com/s?__biz=MzI0MjA4MDA4MA==&mid=210492574&idx=1&sn=9abe95fc369a891245be978303f774b0&scene=4#wechat_redirect';
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
            console.log(param);
            //fs.write(myfile, param+'\n', 'a'); 
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
        var k = 0;

        for (var i=0; i<len; i++) {
            //if (p[i].innerText.indexOf(str1)<0 && p[i].innerText.indexOf(str2)<0) 
            //    continue;
            data += p[i].innerText + '\n';
        }
        return data; 
    }); 
    console.log(content);
    var myfile = casper.evaluate(function(){
        return document.title.substr(5,19);
    }); 
    myfile += ".txt";
    //console.log(myfile);
    fs.write(myfile, content, 'a');
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
    casper.thenOpen(thisurl, function debug2(){ // num[5],num[8],
        casper.waitForSelector('#js_content');
    });
});
casper.then(function debug3(){
    getDeal();
});

/* Get last 10 historys.
casper.then(function debug3(){
    num.forEach(function debug2(link){
        casper.thenOpen(link, function(){
            casper.waitForSelector('#js_content');
        });
        casper.then(function(){
            getDeal();
        });
    });
});
*/

casper.run();

