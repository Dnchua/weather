const router = require('koa-router')();
const userModel = require('../lib/mysql.js');
const moment = require('moment');

router.post('/addBook',async (ctx) => {
    const price =  ctx.request.body.price;
    const bookName = ctx.request.body.bookName;
    const bookCount = ctx.request.body.bookCount;
    const author = ctx.request.body.author;
    const publish = ctx.request.body.publish;

    await userModel.insertBook([
        bookName,
        author,
        price,
        publish,
        bookCount,
        moment().format("YYYY-MM-DD HH:mm:ss")
    ])
        .then(result => {
            let res = result
            if (res !== null ) {
                ctx.body = {state:1,msg:'录入图书成功'};
                console.log('录入信息数据成功')
            }else{
                ctx.body = {state:3,msg:'录入图书失败'};
                console.log('录入信息数据失败!')
            }
        }).catch(err => {
            console.log(err)
            ctx.body = {state:3,msg:'录入图书失败'};
        })
});

router.post('/changePersonInfo',async (ctx) => {
    const sex =  ctx.request.body.sex;
    const telephone = ctx.request.body.telephone;
    const fullName = ctx.request.body.fullName;
    const academy = ctx.request.body.academy;
    const class_id = ctx.request.body.class_id;
    const email = ctx.request.body.email;
    const sid = ctx.request.body.id;
    await userModel.updateSInfo([
        sex,
        telephone,
        fullName,
        academy,
        class_id,
        email,
        sid
    ])
        .then(result => {
            let res = result
            if (res !== null ) {
                ctx.body = {state:1,msg:'录入图书成功'};
                console.log('录入信息数据成功')
            }else{
                ctx.body = {state:3,msg:'录入图书失败'};
                console.log('录入信息数据失败!')
            }
        }).catch(err => {
            console.log(err)
            ctx.body = {state:3,msg:'录入图书失败'};
        })
});


module.exports = router