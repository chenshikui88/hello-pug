var html = 'http://bbs.szhome.com/500-500020-detail-172241537-1251470-0-5.html';
var path = "./";
var myfile = path + ""; 
var selector = '#ReplyDetail';
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
    casper.waitForSelector(selector);
    num = casper.evaluate(function getNumFromPage() {
        var list  = document.getElementsByClassName('post-wrap fix item item-reply');
        var r = list.length;
        var data = new Array(r); 
        var k = 0;
        for (var i=0/*skip title*/; i<r; i++) {
            var reply = list[i].getElementsByClassName('post-main-wrap item-body')[0];
            reply = reply.getElementsByClassName('post-main')[0].getElementsByClassName('post post-first-child')[0];
            reply = reply.getElementsByClassName('post-content ps-r')[0].getElementsByClassName('tzContent')[0];
            
            var sub = reply.getElementsByTagName('div');
            if (sub.length > 0) { // filter reply content
                var len = reply.innerText.length;
                len = len - sub[0].innerText.length;
                data[i] = '\n\n' + i+ '\n\n' + reply.innerText.substr(0,len); 
            } else 
		data[i] = '-------' + i + '--------\n' + reply.innerText;
        }
        return data; 
    });
    //console.log(num);
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
            if (p[i].innerText.indexOf(str1)<0 && p[i].innerText.indexOf(str2)<0) 
                continue;
            data += p[i].innerText + '\n';
        }
        return data; 
    }); 
    console.log(content);
    var myfile = casper.evaluate(function(){
        return document.title.substr(6,16);
    }); 
    myfile += ".txt";
    //console.log(myfile);
    fs.write(myfile, content, 'a');
};

casper.start(html);

casper.then(function (){
    getData();
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

