const router = require('koa-router')();
const userModel = require('../lib/mysql.js')

router.get('/getFirstPageBook',async (ctx) => {
    // const ctx_query = ctx.query;
    // console.log(ctx_query);
    // const id = ctx_query.id;
    await userModel.getFirstPageBook()
        .then(result => {
            let res = result;
            if (res.length) {
                ctx.body = {res:res,state:1};
                console.log('获取首页数据成功')
            }else{
                ctx.body = {res:[],state:3};
                console.log('获取首页数据失败')
            }
        }).catch(err => {
            console.log(err)
            ctx.body = false
        })
});
router.get('/getBorrowBook',async (ctx) => {
    // const ctx_query = ctx.query;
    // console.log(ctx_query);
    const id = ctx.query.id;
    await userModel.getBorrowBook([id])
        .then(result => {
            let res = result;
            if (res.length) {
                ctx.body = {res:res,state:1};
                console.log('获取用户'+ id +'借阅书籍数据成功')
            }else{
                ctx.body = {res:[],state:3};
                console.log('获取用户'+ id +'借阅书籍数据失败')
            }
        }).catch(err => {
            console.log(err)
            ctx.body = {msg:'服务器内部系统出错'}
        })
});
router.get('/getSearchBook',async (ctx) => {
    // const ctx_query = ctx.query;
    // console.log(ctx_query);
    const name = ctx.query.name;
    console.log(name)
    await userModel.getSearchBook(name)
        .then(result => {
            let res = result;
            if (res.length) {
                ctx.body = {res:res,state:1};
                console.log('获取查询'+ name +'书籍数据成功')
            }else{
                ctx.body = {res:[],state:3};
                console.log('获取查询'+ name +'书籍数据失败')
            }
        }).catch(err => {
            console.log(err)
            ctx.body = {msg:'服务器内部系统出错'}
        })
});

router.get('/getRecommendBook',async (ctx) => {
    const id = ctx.query.id;
    // console.log(ctx_query);
    await userModel.getRecommendBook(id)
        .then(result => {
            let res = result;
            if (res.length) {
                ctx.body = {res:res,state:1};
                console.log('获取'+ id +'推荐书籍数据成功')
            }else{
                ctx.body = {res:[],state:3};
                console.log('获取'+ id +'推荐书籍数据失败')
            }
        }).catch(err => {
            console.log(err)
            ctx.body = {msg:'服务器内部系统出错'}
        })
});
module.exports = router