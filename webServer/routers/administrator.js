const router = require('koa-router')();
const userModel = require('../lib/mysql.js');

router.post('/addBook',async (ctx) => {
    const name =  ctx.request.body.name;
    const pass = ctx.request.body.password;
    console.log(name,pass);
    await userModel.findDataByName(name)
        .then(result => {
            let res = result
            if (name === res[0]['name'] && md5(pass) === res[0]['pass']) {
                ctx.body = true;
                ctx.session.user = res[0]['name']
                ctx.session.id = res[0]['id']
                console.log('ctx.session.id', ctx.session.id)
                console.log('session', ctx.session)
                console.log('登录成功')
            }else{
                ctx.body = false;
                console.log('用户名或密码错误!')
            }
        }).catch(err => {
            console.log(err)
            ctx.body = false
        })
});