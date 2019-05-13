var koa = require('koa');
var app = new koa();
var router = require('koa-router')();
var cheerio = require('cheerio');
var request = require('request');
router.get('/',async function(ctx){
    var url = 'http://search.gome.com.cn/search?question=%E6%89%8B%E6%9C%BA&searchType=goods&search_mode=normal';
    request(url,function(err,res,body){
        if (!err && res.statusCode == 200) {
            var $ = cheerio.load(body.toString());
            var products = [];
            $('.product-lists li ').each(function(){
                // console.log($(this).find('img').attr('gome-src'));
                // console.log($('img').eq(0).attr('gome-src'));
                var product = {};
                product.name = $(this).find('.item-name a').text();
                product.imgsrc = $(this).find('img').attr('gome-src');
                product.price = $(this).find('.item-price .price').text();
                products.push(product);
            });

            console.log(products);
            ctx.body = JSON.stringify({products:products});
        } else {
            console.log('get page error url => ' + url);
        }
    });
});
app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(9999);
console.log('Koa server is started! listen at ' + 9999);

